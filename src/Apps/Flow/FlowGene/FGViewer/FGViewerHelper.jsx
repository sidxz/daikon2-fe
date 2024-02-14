export const sidePanelItems = (navigate) => {
  return [
    {
      label: "Sections",
      items: [
        {
          label: "Public Data",
          icon: "ri-book-open-line",
          command: () => {
            navigate(`public/`);
          },
        },

        {
          label: "Org Private Data",
          icon: "ri-git-repository-private-fill",
          command: () => {
            navigate(`protected/`);
          },
        },

        {
          label: "Discussion",
          icon: "ri-discuss-line",
          command: () => {
            navigate(`discussion/`);
          },
        },
      ],
    },
    {
      label: "Actions",
      items: [
        {
          label: "Promote to Target",
          icon: "pi pi-external-link",
          command: () => {
            navigate(`promote/`);
          },
        },
      ],
    },
  ];
};
