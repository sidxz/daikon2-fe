import { useFormik } from "formik";
import { isEqual } from "lodash";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import LoadingBlockUI from "../../../../../../Library/LoadingBlockUI/LoadingBlockUI";
import { RootStoreContext } from "../../../../../../RootStore";
const HaCompoundEvolutionEdit = ({ existingCEvo, closeSideBar }) => {
  const rootStore = useContext(RootStoreContext);
  const { isUpdatingHaCEvo, updateHaCEvo, selected } =
    rootStore.haCompoundEvoStore;

  const formik = useFormik({
    initialValues: {
      evolutionDate: existingCEvo?.evolutionDate || new Date(),
      notes: existingCEvo?.notes || "",
      mic: existingCEvo?.mic || null,
      iC50: existingCEvo?.iC50 || null,
    },

    validate: (values) => {
      const errors = {};
      if (!values.evolutionDate)
        errors.evolutionDate = "EvolutionDate is required.";
      // Additional validations can be added here
      return errors;
    },

    onSubmit: (cEvoToAdd) => {
      let updatedCEvo = { ...existingCEvo, ...cEvoToAdd };
      console.log(updatedCEvo);

      console.log(cEvoToAdd);
      if (isEqual(existingCEvo, updatedCEvo)) {
        toast.info(
          "No modifications detected. Your current values are already saved."
        );
        closeSideBar();
        formik.resetForm();
        return;
      }
      updateHaCEvo(updatedCEvo).then(() => {
        closeSideBar();
        formik.resetForm();
      });
    },
  });

  // Helper functions for form validation and error messages
  const isInvalid = (field) => formik.touched[field] && formik.errors[field];
  const getErrorMessage = (field) =>
    isInvalid(field) && (
      <small className="p-error">{formik.errors[field]}</small>
    );

  return (
    <div className="card w-full">
      <LoadingBlockUI loading={isUpdatingHaCEvo}>
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field">
            <label
              htmlFor="evolutionDate"
              className={classNames({
                "p-error": isInvalid("evolutionDate"),
              })}
            >
              Evolution Date
            </label>
            <Calendar
              id="evolutionDate"
              name="evolutionDate"
              value={new Date(formik.values.evolutionDate)}
              onChange={formik.handleChange}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
              className={classNames({
                "p-invalid": isInvalid("evolutionDate"),
              })}
            />

            {getErrorMessage("evolutionDate")}
          </div>

          <div className="field">
            <label
              htmlFor="mic"
              className={classNames({ "p-error": isInvalid("mic") })}
            >
              MIC (µM)
            </label>
            <InputText
              id="mic"
              value={formik.values.mic}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isInvalid("mic"),
              })}
            />
            {getErrorMessage("mic")}
          </div>

          <div className="field">
            <label
              htmlFor="iC50"
              className={classNames({ "p-error": isInvalid("iC50") })}
            >
              IC50 (µM)
            </label>
            <InputText
              id="iC50"
              value={formik.values.iC50}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isInvalid("iC50"),
              })}
            />
            {getErrorMessage("iC50")}
          </div>

          <div className="field">
            <label
              htmlFor="notes"
              className={classNames({
                "p-error": isInvalid("notes"),
              })}
            >
              Notes
            </label>
            <InputTextarea
              id="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isInvalid("notes"),
              })}
            />
            {getErrorMessage("notes")}
          </div>

          <div className="flex justify-content-end">
            <Button
              icon="icon icon-common icon-database-submit"
              type="submit"
              label="Save Changes"
              className="p-button-secondary p-button-sm"
              loading={isUpdatingHaCEvo}
            />
          </div>
        </form>
      </LoadingBlockUI>
    </div>
  );
};

export default observer(HaCompoundEvolutionEdit);
