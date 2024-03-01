import { Button } from "primereact/button";
import React from "react";
import { DtFieldsToScreenExcelColumnMapping } from "./FSTbScreenRunConstants";
import { ExportScreenRunsToExcel } from "./FSTbScreenRunExport";

const FSTbVScreenDataTableHeader = ({
  selectedScreen,
  setDisplayAddScreenSeqSideBar,
}) => {
  if (selectedScreen === undefined) return <p>Loading...</p>;

  return (
    <div className="table-header flex flex-row w-full">
      <div className="flex justify-content-start"></div>
      <div className="flex justify-content-end w-full">
        <div className="flex flex-grow min-w-max">
          <Button
            type="button"
            icon="pi pi-plus"
            label="Add Library Screen"
            className="p-button-text p-button-md"
            onClick={() => setDisplayAddScreenSeqSideBar(true)}
          />
        </div>
        <div className="flex flex-grow min-w-max">
          <Button
            type="button"
            icon="icon icon-common icon-arrow-circle-down"
            label="Export"
            className="p-button-text p-button-md"
            onClick={() =>
              ExportScreenRunsToExcel(
                selectedScreen,
                DtFieldsToScreenExcelColumnMapping
              )
            }
          />
        </div>
        <div className="flex flex-grow min-w-max">
          {/* <FSTbVHExcelImport selectedHitCollection={selectedHitCollection} /> */}
        </div>
      </div>
    </div>
  );
};

export default FSTbVScreenDataTableHeader;
