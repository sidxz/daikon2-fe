import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Chip } from "primereact/chip";
import { Fieldset } from "primereact/fieldset";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { DataSet } from "vis-data";
import Loading from "../../../../../Library/Loading/Loading";
import SecHeading from "../../../../../Library/SecHeading/SecHeading";
import VisTimeline from "../../../../../Library/VisTimeline/VisTimeline";
import { RootStoreContext } from "../../../../../RootStore";
import { DateValidators } from "../../../../../Shared/Validators/DateValidators";
import { AppOrgResolver } from "../../../../../Shared/VariableResolvers/AppOrgResolver";
import { AppRoleResolver } from "../../../../../Shared/VariableResolvers/AppRoleResolver";
import { appColors } from "../../../../../constants/colors";
import { HAIcon } from "../../../icons/HAIcon";
import { HaAdminRoleName } from "../../constants/roles";
import HaCompoundEvolution from "../../shared/HaCompoundEvolution/HaCompoundEvolution";
import HaStatusDropdown from "../../shared/HaStatusDropdown";
import * as Helper from "./FHaVInformationHelper";
import FHaVAssociatedHits from "./components/FHaVAssociatedHits";
import FHaVInfoOrgs from "./components/FHaVInfoOrgs";

const FHaVInformation = () => {
  const rootStore = useContext(RootStoreContext);
  const { selectedHa, isFetchingHa } = rootStore.haStore;

  const { isUserInAnyOfRoles } = AppRoleResolver();

  if (isFetchingHa) {
    return <Loading message={"Fetching HA..."} />;
  }

  const navigate = useNavigate();

  const { getOrgAliasById } = AppOrgResolver();

  // calculate the waiting to start date in days from the current date = current date - date created
  let waitingToStartDate = new Date() - new Date(selectedHa.dateCreated);
  waitingToStartDate = Math.ceil(waitingToStartDate / (1000 * 3600 * 24));

  const { isDateValid } = DateValidators();

  const today = new Date();
  function addDays(days) {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }
  var groups = new DataSet([
    { id: "group1", content: "group1" },
    { id: "group2", content: "group2" },
  ]);

  const timelineItems = new DataSet([]);

  isDateValid(selectedHa?.dateCreated) &&
    timelineItems.add({
      id: 1,
      content: "Created",
      start: selectedHa?.dateCreated,
      //start: today,
      group: "group1",
    });

  isDateValid(selectedHa?.haPredictedStartDate) &&
    timelineItems.add({
      id: 2,
      content: "Predicted Start",
      start: selectedHa?.haPredictedStartDate,
      //start: addDays(5),
      group: "group1",
    });

  isDateValid(selectedHa?.haStartDate) &&
    timelineItems.add({
      id: 3,
      content: "Actual Start",
      start: selectedHa?.haStartDate,
      //end: selectedHa.h2LPredictedStartDate,
      //start: addDays(6),
      //end: addDays(90),
      //className: "expected",
      group: "group2",
      subgroup: "sg_1",
    });

  isDateValid(selectedHa?.h2LPredictedStartDate) &&
    timelineItems.add({
      id: 4,
      content: "H2L Predicted Start",
      start: selectedHa?.h2LPredictedStartDate,
      group: "group1",
    });

  isDateValid(selectedHa?.removalDate) &&
    timelineItems.add({
      id: 5,
      content: "Termination Date",
      start: selectedHa?.removalDate,
      group: "group1",
    });

  isDateValid(selectedHa?.completionDate) &&
    timelineItems.add({
      id: 6,
      content: "Completed",
      start: selectedHa?.completionDate,
      group: "group1",
    });

  const options = {
    stack: true,
    stackSubgroups: false,
  };

  var titleBarButtons = [];

  if (isUserInAnyOfRoles([HaAdminRoleName])) {
    titleBarButtons.push(<HaStatusDropdown />);
  } else {
    titleBarButtons.push(
      <HaStatusDropdown readOnly={true} readOnlyStatus={selectedHa.status} />
    );
  }

  titleBarButtons.push(
    <Chip
      label={getOrgAliasById(selectedHa?.primaryOrgId)}
      icon="ri-organization-chart"
      className="mr-3"
    />
  );

  return (
    <div className="flex flex-column w-full gap-1">
      <div className="flex w-full">
        <BreadCrumb model={Helper.breadCrumbItems(navigate, selectedHa)} />
      </div>
      <div className="flex w-full">
        <SecHeading
          svgIcon={<HAIcon size={"25em"} />}
          heading={"Hit Assessment - " + selectedHa.name}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.ha}
          entryPoint={selectedHa?.id}
          customElements={titleBarButtons}
        />
      </div>
      <div className="flex w-full">
        <VisTimeline items={timelineItems} options={options} groups={groups} />
      </div>
      <div className="flex w-full">
        <Fieldset className="m-0 flex-grow-1" legend="Description">
          <div className="flex m-1 p-1 text-color-secondary	">
            {selectedHa.description}
          </div>
        </Fieldset>
      </div>
      <div className="flex w-full">
        <Fieldset
          className="m-0 flex-grow-1"
          legend="Organization & Collaboration"
        >
          <FHaVInfoOrgs ha={selectedHa} />
        </Fieldset>
      </div>

      <div className="flex w-full">
        <Fieldset className="m-0 flex-grow-1" legend="Compound Evolution">
          <HaCompoundEvolution events={selectedHa?.haCompoundEvolution} />
        </Fieldset>
      </div>
      <div className="flex w-full">
        <Fieldset className="m-0 flex-grow-1" legend="Associated Hits">
          <FHaVAssociatedHits associatedHits={selectedHa?.associatedHits} />
        </Fieldset>
      </div>
    </div>
  );
};

export default observer(FHaVInformation);
