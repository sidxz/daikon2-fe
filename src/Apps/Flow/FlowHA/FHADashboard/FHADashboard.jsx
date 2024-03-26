import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SecHeading from "../../../../Library/SecHeading/SecHeading";
import { appColors } from "../../../../constants/colors";
import { HAIcon } from "../../icons/HAIcon";
import FHADAllProjects from "./FHADAllProjects/FHADAllProjects";
import FHADMenuBar from "./FHADMenuBar/FHADMenuBar";
import FHADOverview from "./FHADOverview/FHADOverview";

const FHADashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-column min-w-full fadein animation-duration-500">
      <div className="flex w-full">
        <SecHeading
          svgIcon={<HAIcon size={"25em"} />}
          heading="Hit Assessment"
          color={appColors.sectionHeadingBg.ha}
          displayHorizon={false}
          customButtons={[
            {
              label: "New Hit Assessment",
              icon: "pi pi-plus",
              action: () => navigate("/wf/ha/new"),
            },
          ]}
        />
      </div>
      <div className="flex w-full justify-content-center">
        <FHADMenuBar />
      </div>

      <div className="flex w-full">
        <Routes>
          <Route index element={<Navigate to="overview/" />} />
          <Route path="overview/*" element={<FHADOverview />} />
          <Route path="all-projects/*" element={<FHADAllProjects />} />
        </Routes>
      </div>
    </div>
  );
};

export default FHADashboard;
