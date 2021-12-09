import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import NotFound from "../../../app/layout/NotFound/NotFound";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Discussion from "../../../app/common/Discussion/Discussion";
import { Sidebar } from "primereact/sidebar";
import { Message } from "primereact/message";
import PortfolioInformation from "./PortfolioInformation/PortfolioInformation";


const PortfolioView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayPromotionDialog, setDisplayPromotionDialog] = useState(false);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { loadingProject, fetchProject, selectedProject } =
    rootStore.projectStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);
    if (selectedProject === null || selectedProject.id !== match.params.id) {
      fetchProject(match.params.id);
    }
  }, [match.params.id, selectedProject, fetchProject]);

  const sideMenuItems = [
    {
      label: "Sections",
      items: [
        {
          label: "Portfolio Information",
          icon: "icon icon-common icon-analyse",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Links",
          icon: "icon icon-common icon-external-link-square-alt",
          command: () => {
            setActiveIndex(1);
          },
        },
        {
          label: "Discussion",
          icon: "ri-discuss-line",
          command: () => {
            setActiveIndex(2);
          },
        },
      ],
    },
  ];

  var actions = {
    label: "Actions",
    items: []
  };

  if (user.roles.includes("admin") && !selectedProject?.h2LEnabled) {
    actions.items.push(
        {
          label: "Promote to H2L",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            setDisplayPromotionDialog(true);
          }
        }
      );
  }

  if (selectedProject?.h2LEnabled) {
    actions.items.push(
      {
        label: "View Portfolio",
        icon: "icon icon-common icon-database-submit",
        command: (event) => {
          history.push(`/portfolio/${selectedProject.id}`)
        }
      }
    );
  }

  sideMenuItems.push(actions);



  /** Loading Overlay */
  if (loadingProject) {
    console.log("Loading.....");
    return <Loading />;
  }
  if (selectedProject !== null) {
    console.log("selectedProject");
    console.log(selectedProject);
    const breadCrumbItems = [
      {
        label: "Portfolio",
        command: () => {
          history.push("/portfolio/");
        },
      },
      { label: selectedProject.projectName },
    ];

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={sideMenuItems} />
          </div>
          <div className="p-mr-2" style={{ width: "100vw" }}>
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-common icon-analyse"
                  heading={selectedProject.projectName + " | " + selectedProject?.currentStage}
                  accessionNumber={selectedProject.accessionNo}
                  displayHorizion={true}
                />
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Header I" headerClassName="hide">
                    <PortfolioInformation
                      id={match.params.id}
                      project={selectedProject}
                    />
                  </TabPanel>
                  <TabPanel header="Header II" headerClassName="hide">
                    tab 2
                  </TabPanel>
                  <TabPanel header="Header III" headerClassName="hide">
                    <Discussion
                      reference={selectedProject?.accessionNo}
                      section={"Portfolio"}
                    />
                  </TabPanel>
                </TabView>
              </div>
            </div>
          </div>
        </div>
        <Sidebar
          visible={displayPromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          blockScroll={true}
          onHide={() => setDisplayPromotionDialog(false)}
        >
          <h3>{selectedProject.projectName}</h3>
          <i className="icon icon-common icon-plus-circle"></i> &nbsp; Promote
          to <b>H2L</b>
          <hr />
          <Message
            severity="info"
            text={"This would create a new porfolio with stage H2L."}
          />
          <br />
          <br />
          
        </Sidebar>
      </React.Fragment>
    );
  }

  return <NotFound />;
};

export default observer(PortfolioView);
