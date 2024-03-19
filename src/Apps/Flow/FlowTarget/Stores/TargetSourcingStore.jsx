import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import TPQAPI from "../api/TPQAPI";

export default class TargetSourcingStore {
  rootStore;

  questionsRegistry = new Map();
  adminQuestionsRegistry = new Map();
  isFetchingQuestions = false;
  isCacheValid = false;

  isPromotionQuestionnaireSubmitting = false;

  genePromotionDataObj = {};

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      questions: observable,
      isFetchingQuestions: observable,
      fetchQuestions: action,
      questionsRegistry: observable,
      adminQuestionsRegistry: observable,
      questions: computed,
      questionsGrouped: computed,
      isCacheValid: observable,

      genePromotionDataObj: observable,
      saveGenePromotionDataObj: action,
      getGenePromotionDataObj: action,

      submitPromotionQuestionnaire: action,
      isPromotionQuestionnaireSubmitting: observable,

      adminQuestions: computed,
      adminQuestionsGrouped: computed,
    });
  }

  fetchQuestions = async () => {
    console.log("fetchQuestions");
    this.isFetchingQuestions = true;
    try {
      if (this.isCacheValid) return;
      this.adminQuestionsRegistry.clear();
      await this.rootStore.qnaireStore.fetchQuestionnaireByName(
        "TARGET PROMOTION QUESTIONNAIRE"
      );
      runInAction(() => {
        console.log("fetchQuestions runInAction");
        console.log(this.rootStore.qnaireStore.selectedQuestionnaire);
        this.rootStore.qnaireStore.selectedQuestionnaire.questions.forEach(
          (question) => {
            if (question.isAdminOnly) {
              this.adminQuestionsRegistry.set(
                question.identification,
                question
              );
            } else {
              this.questionsRegistry.set(question.identification, question);
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isFetchingQuestions = false;
        this.isCacheValid = true;
      });
    }
  };

  get questions() {
    return Array.from(this.questionsRegistry.values());
  }

  get adminQuestions() {
    return Array.from(this.adminQuestionsRegistry.values());
  }

  get questionsGrouped() {
    let groupedObject = {};

    for (let obj of this.questions) {
      let section = obj.section;
      let subSection = obj.subSection;

      if (!groupedObject[section]) {
        groupedObject[section] = {};
      }

      if (!groupedObject[section][subSection]) {
        groupedObject[section][subSection] = [];
      }

      groupedObject[section][subSection].push(obj);
    }

    return groupedObject;
  }

  get adminQuestionsGrouped() {
    let groupedObject = {};

    for (let obj of this.adminQuestions) {
      let section = obj.section;
      let subSection = obj.subSection;

      if (!groupedObject[section]) {
        groupedObject[section] = {};
      }

      if (!groupedObject[section][subSection]) {
        groupedObject[section][subSection] = [];
      }

      groupedObject[section][subSection].push(obj);
    }

    return groupedObject;
  }

  saveGenePromotionDataObj = (data) => {
    this.genePromotionDataObj = { ...data };
  };

  getGenePromotionDataObj = () => {
    return this.genePromotionDataObj;
  };

  /* submit Promotion Questionnaire from API */
  submitPromotionQuestionnaire = async (data) => {
    this.isPromotionQuestionnaireSubmitting = true;
    let res = null;
    // send to server
    try {
      res = await TPQAPI.submit(data);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isPromotionQuestionnaireSubmitting = false;
      });
    }
    return res;
  };
}