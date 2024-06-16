import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FDate from "../../../../../../Library/FDate/FDate";
import SmilesView from "../../../../../../Library/SmilesView/SmilesView";
import { RootStoreContext } from "../../../../../../RootStore";
import TargetFromGraph from "../../../../../../Shared/ActiveComponents/TargetFromGraph/TargetFromGraph";
import { AppOrgResolver } from "../../../../../../Shared/VariableResolvers/AppOrgResolver";

const FPDOSP = () => {
  const rootStore = useContext(RootStoreContext);
  const { activeSPProjects } = rootStore.projectStore;

  const { getOrgAliasById } = AppOrgResolver();
  const navigate = useNavigate();
  // check if activeSPProjects is empty or not set or null
  if (!activeSPProjects || activeSPProjects.length === 0)
    return (
      <div className="flex justify-content-center w-full align-items-center text-sm	text-color-secondary ">
        - No SP projects are available -
      </div>
    );
  let projectsComponent = activeSPProjects.map((project) => {
    const displayTargetName = project.targetName
      ? project.targetName
      : "Unknown";
    return (
      <div
        className="flex flex-column w-full shadow-1 hover:shadow-3 border-round-md"
        key={project.id}
      >
        <div
          className="flex flex-column  justify-content-center cursor-pointer "
          onClick={() => {
            navigate(`/wf/portfolio/viewer/${project.id}/information`);
          }}
        >
          <div
            className="flex flex-column justify-content-center border-round-top-md "
            style={{
              backgroundColor: "#9A7581",
            }}
          >
            <div className="flex p-2 text-lg text-100 text-white-alpha-90 justify-content-center">
              {project.name}
            </div>
          </div>
          <div className="flex justify-content-center border-bottom-1 border-gray-100">
            <div
              className="flex justify-content-center align-items-center w-full p-2 text-pink-800 border-right-1 border-gray-100"
              style={{
                minWidth: "4rem",
                backgroundColor: "#6e8a9d",
              }}
            >
              <div className="flex mr-1 text-white">
                <i className="pi pi-angle-double-right" />
              </div>
              <div className="flex">
                <FDate timestamp={project.spStart} color="#FFFFFF" />{" "}
              </div>
            </div>

            <div
              className="flex justify-content-center w-full p-2 text-pink-800 border-right-1 border-gray-100"
              style={{
                minWidth: "4rem",
              }}
            >
              {getOrgAliasById(project?.primaryOrgId)}
            </div>

            <div
              className="flex justify-content-center w-full p-2 border-right-1 border-gray-100"
              style={{
                minWidth: "4rem",
              }}
            >
              <TargetFromGraph elementId={project.id} />
            </div>

            <div
              className="flex justify-content-center align-items-center w-full p-2 text-100"
              style={{
                minWidth: "4rem",
                backgroundColor: "#6D9CA9",
              }}
            >
              {" "}
              <div className="flex">
                <FDate timestamp={project?.indPredictedStart} color="#FFFFFF" />{" "}
              </div>
              <div className="flex ml-1 text-white">
                <i className="pi pi-angle-double-right" />
              </div>
            </div>
          </div>
          <div className="flex w-full p-2 justify-content-center">
            <SmilesView
              smiles={
                project.compoundEvoLatestSMILES != null
                  ? project.compoundEvoLatestSMILES
                  : project.compoundSMILES
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

export default observer(FPDOSP);
