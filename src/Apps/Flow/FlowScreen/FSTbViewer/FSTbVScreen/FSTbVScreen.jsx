import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Sidebar } from "primereact/sidebar";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../../Library/Loading/Loading";
import SecHeading from "../../../../../Library/SecHeading/SecHeading";
import { RootStoreContext } from "../../../../../RootStore";
import { CalendarRowEditor } from "../../../../../Shared/TableRowEditors/CalendarRowEditor";
import { ScientistRowEditor } from "../../../../../Shared/TableRowEditors/ScientistRowEditor";
import { TextRowEditor } from "../../../../../Shared/TableRowEditors/TextRowEditor";
import { appColors } from "../../../../../constants/colors";
import * as Helper from "./FSTbVScreenHelper";
import FSTbScreenRunAdd from "./components/FSTbScreenRunAdd";
import FSTbVScreenDataTableHeader from "./components/FSTbVScreenDataTableHeader";

const FSTbVScreen = ({}) => {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);

  const { fetchScreen, isFetchingScreen, selectedScreen } =
    rootStore.screenStore;

  const { updateScreenRun, isUpdatingScreenRun } = rootStore.screenRunStore;

  const [displayAddScreenSeqSideBar, setDisplayAddScreenSeqSideBar] =
    useState(false);

  if (isFetchingScreen) {
    return <Loading message={"Fetching Screen..."} />;
  }

  console.log("selectedScreen", selectedScreen);

  const addScreenSeqSideBarHeader = (
    <div className="flex align-items-center gap-2">
      <i className="icon icon-common icon-plus-circle"></i>
      <span className="font-bold">Add Hit</span>
    </div>
  );

  if (selectedScreen && !isFetchingScreen) {
    return (
      <>
        <div className="flex flex-column w-full">
          <div className="flex w-full">
            <BreadCrumb
              model={Helper.breadCrumbItems(selectedScreen, navigate)}
            />
          </div>
          <div className="flex w-full">
            <SecHeading
              icon="icon icon-conceptual icon-structures-3d"
              heading={"Screen - " + selectedScreen.name}
              displayHorizon={true}
              color={appColors.sectionHeadingBg.screen}
              customElements={[
                <Chip
                  label={selectedScreen?.method}
                  icon="icon icon-common icon-circle-notch"
                />,
                <Chip
                  label={selectedScreen?.primaryOrgName}
                  icon="ri-organization-chart"
                  className="mr-3"
                />,
              ]}
            />
          </div>

          <div className="flex w-full">
            <DataTable
              className="p-datatable-gridlines w-full"
              size="small"
              value={selectedScreen?.screenRuns}
              showGridlines
              //header={tableHeader}
              editMode="row"
              sortField="startDate"
              sortOrder={-1}
              onRowEditComplete={(e) => updateScreenRun(e.newData)}
              //loading={isEditingScreenSequence}

              header={
                <FSTbVScreenDataTableHeader
                  selectedScreen={selectedScreen}
                  setDisplayAddScreenSeqSideBar={setDisplayAddScreenSeqSideBar}
                />
              }
            >
              <Column
                field="library"
                header="Library"
                editor={(options) => TextRowEditor(options)}
              />

              <Column
                field={"protocol"}
                //body={protocolBodyTemplate}
                header="Protocol"
                editor={(options) => TextRowEditor(options)}
              />
              <Column
                field="concentration"
                header="Inhibitor C (&micro;M)"
                editor={(options) => TextRowEditor(options)}
              />
              <Column
                field="noOfCompoundsScreened"
                header="No. of Compounds"
                editor={(options) => TextRowEditor(options)}
                //body={CompoundsScreenedTemplate}
              />
              <Column
                field="scientist"
                header="Scientist"
                editor={(options) => ScientistRowEditor(options)}
                style={{ wordWrap: "break-word" }}
              />
              <Column
                field="startDate"
                header="Start Date"
                editor={(options) => CalendarRowEditor(options)}
                body={Helper.StartDateTemplate}
                sortable
              />
              <Column
                field="endDate"
                header="End Date"
                editor={(options) => CalendarRowEditor(options)}
                body={Helper.EndDateTemplate}
                sortable
              />
              <Column
                field="primaryHitCount"
                header="Initial Hit Count"
                editor={(options) => TextRowEditor(options)}
                // body={UnverifiedHitCountTemplate}
              />

              <Column
                field="confirmedHitCount"
                header="Validated Hit Count"
                editor={(options) => TextRowEditor(options)}
                //body={ConfirmedHitCountTemplate}
              />

              <Column
                rowEditor
                headerStyle={{ minWidth: "4rem" }}
                bodyStyle={{ textAlign: "center" }}
              />
            </DataTable>
          </div>
        </div>
        <Sidebar
          visible={displayAddScreenSeqSideBar}
          position="right"
          onHide={() => setDisplayAddScreenSeqSideBar(false)}
          className="p-sidebar-sm"
          header={addScreenSeqSideBarHeader}
        >
          <FSTbScreenRunAdd
            closeSideBar={() => setDisplayAddScreenSeqSideBar(false)}
            screenId={selectedScreen?.id}
          />
        </Sidebar>
      </>
    );
  }

  return <div>FSTbVScreens</div>;
};

export default observer(FSTbVScreen);
