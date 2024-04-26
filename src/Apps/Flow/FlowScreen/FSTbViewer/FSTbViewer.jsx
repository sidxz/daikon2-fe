import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "../../../../Library/Loading/Loading";
import { RootStoreContext } from "../../../../RootStore";
import FSTbComments from "./FSTbComments/FSTbComments";
import FSTbVHitCollection from "./FSTbVHitCollection/FSTbVHitCollection";
import FSTbVHitCollectionSelection from "./FSTbVHitCollection/FSTbVHitCollectionSelection";
import FSTbVScreen from "./FSTbVScreen/FSTbVScreen";
import FSTbVSettings from "./FSTbVSettings/FSTbVSettings";
import * as Helper from "./FSTbViewerHelper";
const FSTbViewer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  const {
    fetchScreen,
    fetchScreens,
    selectedScreen,
    isFetchingScreen,
    isScreenRegistryCacheValid,
  } = rootStore.screenStore;

  useEffect(() => {
    if (
      selectedScreen === undefined ||
      selectedScreen?.id !== params?.id ||
      !isScreenRegistryCacheValid
    ) {
      fetchScreens();
      fetchScreen(params.id);
    }
  }, [
    params.id,
    fetchScreen,
    selectedScreen,
    isScreenRegistryCacheValid,
    fetchScreens,
  ]);

  if (isFetchingScreen) {
    return <Loading message={"Fetching Screen..."} />;
  }

  if (selectedScreen) {
    let getRelatedScreens = () => {
      // Find out other screens having the same target in associatedTargets
      let relatedScreens = [];
      if (selectedScreen.associatedTargets) {
        let targetIds = Object.keys(selectedScreen.associatedTargets);
        for (let targetId of targetIds) {
          let screen = rootStore.screenStore.screenListTargetBased
            .filter((screen) => screen.id !== selectedScreen.id)
            .filter((screen) =>
              Object.keys(screen.associatedTargets).includes(targetId)
            );
          relatedScreens.push(...screen);
        }
      }
      // sort relatedScreens by name
      relatedScreens.sort((a, b) => a.name.localeCompare(b.name));
      return relatedScreens;
    };

    return (
      <div className="flex w-full">
        <div className="flex gap-2 w-full">
          <div className="flex">
            <Menu model={Helper.sidePanelItems(navigate, getRelatedScreens)} />
          </div>
          <div className="flex w-full">
            <Routes>
              <Route index element={<Navigate replace to="screens/" />} />
              <Route
                path="hits/:hitCollectionId/"
                element={<FSTbVHitCollection selectedScreen={selectedScreen} />}
              />
              <Route
                path="hits/"
                element={
                  <FSTbVHitCollectionSelection
                    selectedScreen={selectedScreen}
                  />
                }
              />
              <Route
                path="screens/"
                element={<FSTbVScreen selectedScreen={selectedScreen} />}
              />
              <Route
                path="settings/"
                element={<FSTbVSettings selectedScreen={selectedScreen} />}
              />
              <Route
                path="discussion/"
                element={<FSTbComments selectedScreen={selectedScreen} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  return <div>FSTbViewer</div>;
};

export default observer(FSTbViewer);
