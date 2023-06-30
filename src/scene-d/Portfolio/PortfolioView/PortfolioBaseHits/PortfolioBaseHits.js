import { BreadCrumb } from "primereact/breadcrumb";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import SmilesViewWithDetails from "../../../../app/common/SmilesViewWithDetails/SmilesViewWithDetails";
import { appColors } from "../../../../colors";

const PortfolioBaseHits = ({ project }) => {
  const dt = useRef(null);
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Portfolio",
      command: () => {
        navigate("/d/portfolio/");
      },
    },
    {
      label: project.projectName,
      command: () => {
        navigate(`/d/portfolio/${project.id}`);
      },
    },
    { label: "Base Hits" },
  ];

  let tableData = [];

  if (project?.baseHits.length !== 0) {
    project.baseHits.forEach((baseHit) => {
      tableData.push({
        id: baseHit.baseHit.compound.id,
        molArea: baseHit.baseHit.compound.molArea,
        molWeight: baseHit.baseHit.compound.molWeight,
        externalCompoundIds: baseHit.baseHit.compound.externalCompoundIds,
        compound: baseHit.baseHit.compound,
        iC50: baseHit.baseHit.iC50,
        mic: baseHit.baseHit.mic,
      });
    });
  }

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>
          <SmilesViewWithDetails compound={rowData.compound} width={300} />
        </div>
      </React.Fragment>
    );
  };

  const CompoundIdBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData?.externalCompoundIds}</React.Fragment>;
  };

  return (
    <React.Fragment>
      {/* First div for general information and dates */}

      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-analyse"
            heading={project.projectName + " | " + project?.currentStage}
            entryPoint={project.targetName}
            displayHorizon={true}
            color={appColors.sectionHeadingBg.portfolio}
          />
        </div>
        <div className="flex w-full">
          <DataTable
            ref={dt}
            value={tableData}
            emptyMessage="No data."
            resizableColumns
            columnResizeMode="fit"
            showGridlines
            dataKey="id"
          >
            <Column
              header="Structure"
              body={StructureBodyTemplate}
              style={{ width: "330px" }}
            />
            <Column
              field="CompoundId"
              header="Compound Id"
              body={CompoundIdBodyTemplate}
              style={{ width: "200px" }}
            />
            <Column field="mic" header="MIC (&micro;M)" />
            <Column field="iC50" header="IC50 (&micro;M)" />
          </DataTable>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PortfolioBaseHits;
