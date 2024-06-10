import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../Library/Loading/Loading";
import NotFound from "../../../../Library/NotFound/NotFound";
import { RootStoreContext } from "../../../../RootStore";
import { AppRoleResolver } from "../../../../Shared/VariableResolvers/AppRoleResolver";
import { HaAdminRoleName } from "../constants/roles";
import FHaVComments from "./FHaVComments/FHaVComments";
import FHaVInformation from "./FHaVInformation/FHaVInformation";
import FHaVSettings from "./FHaVSettings/FHaVSettings";
import * as Helper from "./FHaViewerHelper";

const FHaViewer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { fetchHa, selectedHa, isFetchingHa, isHaRegistryCacheValid } =
    rootStore.haStore;

  const { isUserInAnyOfRoles } = AppRoleResolver();

  useEffect(() => {
    if (
      selectedHa === undefined ||
      selectedHa?.id !== params?.id ||
      !isHaRegistryCacheValid
    ) {
      fetchHa(params.id);
    }
  }, [params.id, fetchHa, selectedHa, isHaRegistryCacheValid]);

  if (isFetchingHa) {
    return <Loading message={"Fetching HA..."} />;
  }

  console.log("FHAViewer -> selectedHa", selectedHa);

  if (selectedHa) {
    return (
      <div className="flex w-full">
        <div className="flex gap-2 w-full">
          <div className="flex">
            <Menu model={Helper.sidePanelItems(navigate)} />
          </div>
          <div className="flex w-full">
            <Routes>
              <Route index element={<Navigate replace to="information/" />} />
              <Route path="information/*" element={<FHaVInformation />} />
              <Route
                path="discussion/*"
                element={<FHaVComments selectedHa={selectedHa} />}
              />
              {isUserInAnyOfRoles([HaAdminRoleName]) && (
                <Route path="settings/*" element={<FHaVSettings />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
};

export default observer(FHaViewer);
