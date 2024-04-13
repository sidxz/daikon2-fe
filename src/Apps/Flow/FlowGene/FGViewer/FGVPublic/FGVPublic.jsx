import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Fieldset } from "primereact/fieldset";
import React from "react";
import { useNavigate } from "react-router";
import SecHeading from "../../../../../Library/SecHeading/SecHeading";
import { appColors } from "../../../../../constants/colors";
import { GeneIcon } from "../../../icons/GeneIcon";
import FGVPProteinDataBank from "./FGVPProteinDataBank/FGVPProteinDataBank";

const FGVPublic = ({ selectedGene }) => {
  console.log(selectedGene);
  const navigate = useNavigate();
  const breadCrumbItems = [
    {
      label: "Genes",
      command: () => {
        navigate("/wf/gene/");
      },
    },
    {
      label: selectedGene.accessionNumber,
      command: () => {
        navigate(`/wf/gene/${selectedGene.id}`);
      },
    },
    { label: "Public Data" },
  ];

  let generalInfoData = [
    { name: "Gene Name", value: selectedGene.name },
    { name: "Protein Name", value: selectedGene?.proteinNameExpanded },
    { name: "Product", value: selectedGene.product },
    { name: "Functional Category", value: selectedGene.functionalCategory },
  ];

  let coordinatesData = [
    { name: "Start", value: selectedGene?.coordinates?.item1 || 0 },
    { name: "End", value: selectedGene?.coordinates?.item2 || 0 },
    { name: "Orientation", value: selectedGene?.coordinates?.item3 || 0 },
  ];

  let orthologsData = selectedGene.orthologues
    .filter((orthologue) => orthologue.item2)
    .map((orthologue) => ({
      name: orthologue.item1,
      value: orthologue.item2,
    }));

  let mycobrowswerCommentsData = [
    {
      name: "Comments",
      value: selectedGene?.comments,
    },
  ];

  let geneFunctionData = selectedGene.expansionProps
    .filter((prop) => prop.expansionType === "function")
    .map((fun) => ({
      value: fun.expansionValue,
    }));

  let geneOntologyCellularComponent = selectedGene.expansionProps
    .filter((prop) => prop.expansionType === "geneOntologyCellularComponent")
    .map((fun) => ({
      name: "Cellular Component",
      value: fun.expansionValue,
    }));

  let geneOntologyMolecularFunction = selectedGene.expansionProps
    .filter((prop) => prop.expansionType === "geneOntologyMolecularFunction")
    .map((fun) => ({
      name: "Molecular Function",
      value: fun.expansionValue,
    }));

  let geneOntologyBiologicalProcess = selectedGene.expansionProps
    .filter((prop) => prop.expansionType === "geneOntologyBiologicalProcess")
    .map((fun) => ({
      name: "Biological Process",
      value: fun.expansionValue,
    }));

  let geneOntologyData = [
    ...geneOntologyCellularComponent,
    ...geneOntologyMolecularFunction,
    ...geneOntologyBiologicalProcess,
  ];

  let proteinSummaryData = [
    {
      name: "Molecular Mass",
      value: "",
    },
    {
      name: "Isoelectric Point",
      value: "",
    },
    {
      name: "Protein Length",
      value: selectedGene?.proteinLength,
    },
  ];

  let geneSummaryData = [
    {
      name: "Gene Length",
      value: selectedGene?.geneLength,
    },
    {
      name: "Location",
      value: selectedGene?.coordinates?.item1,
    },
  ];

  let genomicSequenceData = selectedGene?.geneSequence;
  let proteinSequenceData = selectedGene?.proteinSequence;

  return (
    <div className="flex flex-column w-full">
      <div className="flex w-full">
        <BreadCrumb model={breadCrumbItems} />
      </div>
      <div className="flex w-full">
        <SecHeading
          svgIcon={<GeneIcon size={"25em"} />}
          heading={selectedGene.accessionNumber}
          accessionNumber={selectedGene.accessionNumber}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.gene}
          breadCrumbItems={breadCrumbItems}
          entryPoint={selectedGene?.id}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex flex-column gap-2">
          <div className="flex pt-2">
            <Fieldset className="m-0 flex-grow-1" legend="General annotation">
              <DataTable
                value={generalInfoData}
                className="HideDataTableHeader"
              >
                <Column field="name"></Column>
                <Column field="value"></Column>
              </DataTable>
            </Fieldset>
          </div>

          <div className="flex pt-2">
            <Fieldset className="m-0 flex-grow-1" legend="Function">
              <DataTable
                value={geneFunctionData}
                className="HideDataTableHeader"
              >
                <Column
                  field="value"
                  className="m-0 p-0"
                  body={(rowData) => (
                    <ul>
                      {rowData.value
                        .split(".") // Split by period to get sentences
                        .map((sentence) => sentence.trim()) // Trim whitespace from each sentence
                        .filter((sentence) => sentence) // Filter out empty sentences
                        .map((sentence, index) => (
                          <li key={index}>{sentence}.</li> // Append period to each sentence visually, not logically
                        ))}
                    </ul>
                  )}
                />
              </DataTable>
            </Fieldset>
          </div>

          <div className="flex pt-2">
            <Fieldset className="m-0 flex-grow-1" legend="Mycobrowser Comments">
              <DataTable
                value={mycobrowswerCommentsData}
                className="HideDataTableHeader"
              >
                <Column field="value"></Column>
              </DataTable>
            </Fieldset>
          </div>

          <div className="flex pt-2">
            <Fieldset className="m-0 flex-grow-1" legend="GO annotations">
              <DataTable
                value={geneOntologyData}
                className="HideDataTableHeader"
                size="small"
                stripedRows
              >
                <Column field="name"></Column>
                <Column field="value"></Column>
              </DataTable>
            </Fieldset>
          </div>

          <div className="flex gap-2">
            <Fieldset className="m-0 flex-grow-1" legend="Protein Databank">
              <FGVPProteinDataBank
                accessionNumber={selectedGene.accessionNumber}
                UniprotID={selectedGene.uniProtKB}
              />
            </Fieldset>
          </div>

          <div className="flex gap-2">
            <Fieldset
              className="m-0 flex-grow-1"
              legend="Genomic Sequence"
              toggleable
              collapsed={false}
            >
              <div
                className="p-text-lowercase"
                style={{
                  maxWidth: "60vw",
                  fontFamily: "monospace",
                  wordWrap: "break-word",
                }}
              >
                {genomicSequenceData}
              </div>
            </Fieldset>
          </div>

          <div className="flex gap-2">
            <Fieldset
              className="m-0 flex-grow-1"
              legend="Protein Sequence"
              toggleable
              collapsed={false}
            >
              <div
                className="p-text-lowercase"
                style={{
                  maxWidth: "60vw",
                  fontFamily: "monospace",
                  wordWrap: "break-word",
                }}
              >
                {proteinSequenceData}
              </div>
            </Fieldset>
          </div>
        </div>

        <div className="flex flex-column gap-2">
          <div className="flex pt-2">
            <Fieldset className="m-0 flex-grow-1" legend="Coordinates">
              <DataTable
                value={coordinatesData}
                className="HideDataTableHeader"
              >
                <Column field="name"></Column>
                <Column field="value"></Column>
              </DataTable>
            </Fieldset>
          </div>

          <div className="flex pt-2">
            <Fieldset className="m-0 flex-grow-1" legend="Orthologs">
              <DataTable value={orthologsData} className="HideDataTableHeader">
                <Column field="name"></Column>
                <Column field="value"></Column>
              </DataTable>
            </Fieldset>
          </div>

          <div className="flex pt-2">
            <Fieldset className="m-0 flex-grow-1" legend="Protein Summary">
              <DataTable
                value={proteinSummaryData}
                className="HideDataTableHeader"
              >
                <Column field="name"></Column>
                <Column field="value"></Column>
              </DataTable>
            </Fieldset>
          </div>
          <div className="flex pt-2">
            <Fieldset className="m-0 flex-grow-1" legend="Gene Summary">
              <DataTable
                value={geneSummaryData}
                className="HideDataTableHeader"
              >
                <Column field="name"></Column>
                <Column field="value"></Column>
              </DataTable>
            </Fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(FGVPublic);
