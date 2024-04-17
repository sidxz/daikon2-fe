import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FDate from "../../../../../../Library/FDate/FDate";
import SmilesView from "../../../../../../Library/SmilesView/SmilesView";
import { RootStoreContext } from "../../../../../../RootStore";
import { AppOrgResolver } from "../../../../../../Shared/VariableResolvers/AppOrgResolver";

const FPDOReady = () => {
  const { getOrgNameById } = AppOrgResolver();
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  const { readyForPortfolio } = rootStore.projectStore;

  // check if readyForPortfolio is empty or not set or null
  if (!readyForPortfolio || readyForPortfolio.length === 0)
    return (
      <div className="flex justify-content-center w-full align-items-center text-sm	text-color-secondary ">
        - No projects are ready for portfolio -
      </div>
    );

  let projectsComponent = readyForPortfolio.map((ha) => {
    const displayTargetName = ha.targetName ? ha.targetName : "Phenotypic";
    return (
      <div className="flex flex-column w-full shadow-1 hover:shadow-3">
        <div
          className="flex flex-column  justify-content-center cursor-pointer "
          onClick={() => {
            navigate(`/wf/ha/viewer/${ha.id}/`);
          }}
        >
          <div
            className="flex flex-column justify-content-center "
            style={{
              backgroundColor: "#9c8c79",
            }}
          >
            <div className="flex p-2 text-lg text-100 text-white-alpha-90 justify-content-center">
              {ha.name}
            </div>
          </div>

          <div className="flex justify-content-center border-yellow-100 border-bottom-1">
            <div
              className="flex justify-content-center w-full p-2 text-yellow-800 border-right-1 border-yellow-100"
              style={{
                minWidth: "4rem",
              }}
            >
              pks13
            </div>

            <div
              className="flex justify-content-center w-full p-2 text-yellow-800 border-right-1 border-yellow-100"
              style={{
                minWidth: "4rem",
              }}
            >
              {getOrgNameById(ha?.primaryOrgId)}
            </div>

            <div
              className="flex justify-content-center w-full p-2 text-yellow-800 border-right-1 border-yellow-100"
              style={{
                minWidth: "4rem",
              }}
            >
              <FDate timestamp={ha.statusLastModifiedDate} color="#8c7217" />
            </div>

            <div
              className="flex justify-content-center w-full p-2"
              style={{
                minWidth: "4rem",
                backgroundColor: "#8c9f8b",
              }}
            >
              <FDate timestamp={ha.haPredictedStartDate} color="#FFFFFF" />
            </div>
          </div>
          <div className="flex p-2 w-full justify-content-center">
            <SmilesView
              smiles={
                ha.compoundEvoLatestSMILES != null
                  ? ha.compoundEvoLatestSMILES
                  : ha.compoundSMILES
              }
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-wrap w-full gap-3 p-1 align-items-center justify-content-center w-full">
      {projectsComponent}
    </div>
  );
};

export default observer(FPDOReady);
