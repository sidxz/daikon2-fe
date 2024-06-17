import SmilesView from "../../../../../../../Library/SmilesView/SmilesView";

export const StructureBodyTemplate = (rowData) => {
  return (
    <>
      <div
        className="flex flex-column"
        style={{ width: "250px", height: "250px" }}
      >
        <div className="flex justify-content-end">
          {rowData?.isHitPromoted && (
            <Tag severity="success" value="Promoted"></Tag>
          )}
        </div>
        <div className="flex">
          <SmilesView
            smiles={rowData?.requestedSMILES}
            compoundId={rowData?.molecule?.id}
            width={"250"}
            height={"250"}
          />
        </div>
      </div>
    </>
  );
};

export const LibraryBodyTemplate = (rowData) => {
  return (
    <>
      {rowData.library}
      <br />
      {rowData.source}
    </>
  );
};
