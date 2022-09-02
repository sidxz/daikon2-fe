import React, { useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScreenDashDataTable.css";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { appColors } from '../../../colors';
import { TabView } from 'primereact/tabview';
import { TabPanel } from 'primereact/tabview';

const ScreenDash = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingFetchScreens,
    screenRegistry,
    fetchScreens,
    uniqueScreens,
    loadingFetchScreensPhenotypic,
    screenPhenotypicRegistry,
    fetchScreensPhenotypic,
    screensPhenotypic } =
    rootStore.screenStore;

  /* Local State Management */

  useEffect(() => {
    if (screenRegistry.size === 0) fetchScreens();
    if (screenPhenotypicRegistry.size === 0) fetchScreensPhenotypic();
  }, [screenRegistry, fetchScreens, screenPhenotypicRegistry, fetchScreensPhenotypic]); // eslint-disable-line react-hooks/exhaustive-deps

  /* local variables */

  const dt = useRef(null);

  if (!loadingFetchScreens && !loadingFetchScreensPhenotypic) {
    /* Table Body Templates */

    console.log(screenPhenotypicRegistry)

    const TargetNameBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Target</span>
          <NavLink to={"./target-based/" + rowData.targetName}>
            {rowData.targetName}
          </NavLink>
        </React.Fragment>
      );
    };

    const PhenotypicScreenNameBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Target</span>
          <NavLink to={"./phenotypic/" + rowData.screenName}>
            {rowData.screenName}
          </NavLink>
        </React.Fragment>
      );
    };

    // const StatusBodyTemplate = (rowData) => {
    //   return (
    //     <React.Fragment>
    //       <span className="p-column-title">Status</span>
    //       {rowData.status}
    //     </React.Fragment>
    //   );
    // };

    const NotesBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Notes</span>
          {rowData.notes}
        </React.Fragment>
      );
    };

    return (
      <div className="flex flex-column w-full fadein animation-duration-500">
        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-search"
            heading="Screens"
            color={appColors.sectionHeadingBg.screen}
          />
        </div>
        <div className="flex w-full">
          <TabView className="w-full">
            <TabPanel header="Target Based">
              <div className="datatable-screens">
                <DataTable
                  ref={dt}
                  value={uniqueScreens}
                  paginator
                  rows={20}
                  className="p-datatable-screens"
                  //globalFilter={globalFilter}
                  emptyMessage="No Screens found."
                  filterDisplay="row"
                >
                  <Column
                    field="targetName"
                    header="Name"
                    body={TargetNameBodyTemplate}
                    filter
                    filterMatchMode="contains"
                    filterPlaceholder="Search by Target Name"
                    className="min-w-max"
                  // style={{minWidth: "50rem"}}

                  />

                  {/* <Column field="status" header="Status" body={StatusBodyTemplate} /> */}

                  <Column field="notes" header="Notes" body={NotesBodyTemplate} />
                </DataTable>
              </div>
            </TabPanel>
            <TabPanel header="Phenotypic">

              <div className="datatable-screens">
                <DataTable
                  ref={dt}
                  value={screensPhenotypic}
                  paginator
                  rows={20}
                  className="p-datatable-screens"
                  //globalFilter={globalFilter}
                  emptyMessage="No Phenotypic Screens found."
                  filterDisplay="row"
                >
                  <Column
                    field="screenName"
                    header="Name"
                    body={PhenotypicScreenNameBodyTemplate}
                    filter
                    filterMatchMode="contains"
                    filterPlaceholder="Search by Screen Name"
                    className="min-w-max"
                  // style={{minWidth: "50rem"}}

                  />

                  {/* <Column field="status" header="Status" body={StatusBodyTemplate} /> */}

                  <Column field="notes" header="Notes" body={NotesBodyTemplate} />
                </DataTable>
              </div>

            </TabPanel>
          </TabView>

        </div>
      </div>

    );
  }

  /** Loading Overlay */

  return <Loading />;
};

export default observer(ScreenDash);
