import { AppRoleResolver } from "../../../../Shared/VariableResolvers/AppRoleResolver";
import { HitCollectionIcon } from "../../icons/HitCollectionIcon";
import { PhenoScreenIcon } from "../../icons/PhenoScreenIcon";
import { ScreenAdminRoleName } from "../constants/roles";

export const sidePanelItems = (navigate) => {
  const { isUserInAnyOfRoles } = AppRoleResolver();
  const menuItems = [];
  menuItems.push({
    label: "Sections",
    items: [
      {
        label: "Screens",
        icon: <PhenoScreenIcon size={"18em"} grayscale={1} />,
        command: () => {
          navigate("screens/");
        },
      },
      {
        label: "Hits",
        icon: <HitCollectionIcon size={"18em"} grayscale={1} />,
        command: () => {
          navigate("hits/");
        },
      },

      {
        label: "Discussion",
        icon: "ri-discuss-line",
        command: () => {
          navigate("discussion/");
        },
      },
    ],
  });

  if (isUserInAnyOfRoles([ScreenAdminRoleName])) {
    menuItems.push({
      label: "Admin Section",
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
          command: () => {
            navigate("settings/");
          },
        },
      ],
    });
  }
  return menuItems;
};
