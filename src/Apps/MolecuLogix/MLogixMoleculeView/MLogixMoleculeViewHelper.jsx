export const sidePanelItems = (navigate, selectedMolecule) => {
  return [
    {
      label: "Sections",
      items: [],
    },
    {
      label: "Actions",
      items: [
        {
          label: "Find Similar Molecules",
          icon: "icon icon-common icon-database-submit",
          command: () => {
            navigate(`/moleculogix/search/${selectedMolecule.smilesCanonical}`);
          },
        },
        {
          label: "Edit Molecule",
          icon: "icon icon-common icon-edit",
          command: () => {
            navigate(`/moleculogix/molecule/${selectedMolecule.id}/edit`);
          },
        },
      ],
    },
  ];
};

export const breadCrumbItems = (selectedMolecule, navigate) => {
  return [
    {
      label: "MolecuLogix",
      command: () => {
        navigate("/moleculogix/");
      },
    },
    {
      label: selectedMolecule.name,
      command: () => {
        navigate(`/moleculogix/molecule/${selectedMolecule.id}`);
      },
    },
  ];
};
