import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";
import { FcAlarmClock, FcDisapprove, FcExpired, FcOk } from "react-icons/fc";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../../../Library/Loading/Loading";
import SecHeading from "../../../../Library/SecHeading/SecHeading";
import { RootStoreContext } from "../../../../RootStore";
import InputOrg from "../../../../Shared/InputEditors/InputOrg";
import { appColors } from "../../../../constants/colors";
import { HAIcon } from "../../icons/HAIcon";
import FHANewBaseHitData from "./components/FHANewBaseHitData/FHANewBaseHitData";
import FHaNewHitPicker from "./components/FHaNewHitPicker/FHaNewHitPicker";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { FaExclamationTriangle } from "react-icons/fa";
import { FcHighPriority } from "react-icons/fc";
import { toast } from "react-toastify";
import InputMultiOrg from "../../../../Shared/InputEditors/InputMultiOrg";
const FHANew = () => {
  const [searchParams] = useSearchParams();
  const encodedData = searchParams.get("data");
  let decodedData = null;
  if (encodedData) {
    const decodedDataString = atob(encodedData);
    decodedData = JSON.parse(decodedDataString);
  }
  const [baseHitData, setBaseHitData] = useState(decodedData);

  console.log("FHANew -> baseHitData", baseHitData);

  // make sure screen and hits are prefetched

  const rootStore = useContext(RootStoreContext);
  const {
    fetchScreens,
    isScreenListCacheValid,
    screenList,
    isFetchingScreens,
  } = rootStore.screenStore;

  const { isAddingHA, addHA } = rootStore.haStore;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isScreenListCacheValid) {
      fetchScreens();
    }
  }, [isScreenListCacheValid, fetchScreens]);

  const formik = useFormik({
    initialValues: {
      name: "",
      haType: "",
      legacyId: "",
      primaryOrgId: "",
      hAStatus: "Ready for HA",
      hADescription: "",
      participatingOrgs: [],
    },

    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required.";
      if (!values.primaryOrgId)
        errors.primaryOrgId = "Organization is required.";
      // Additional validations can be added here
      return errors;
    },

    onSubmit: (newHa) => {
      if (baseHitData == null) {
        toast.error("Please select hit molecules before submitting.");
        return;
      }

      let data = {
        ...newHa,
        ...baseHitData,
      };

      console.log("FHANew -> data", data);

      addHA(newHa).then(() => {
        formik.resetForm();
        navigate("/wf/ha/dash/all-projects/");
      });
    },
  });

  // Helper functions for form validation and error messages
  const isInvalid = (field) => formik.touched[field] && formik.errors[field];
  const getErrorMessage = (field) =>
    isInvalid(field) && (
      <small className="p-error">{formik.errors[field]}</small>
    );

  if (isFetchingScreens) {
    return <Loading message="Fetching screens and hits..." />;
  }

  const statusOptions = [
    { name: "Ready for HA", icon: <FcAlarmClock /> },
    { name: "Incorrect m/z", icon: <FaExclamationTriangle /> },
    { name: "Known Liability", icon: <FcHighPriority /> },
    { name: "Complete - Failed", icon: <FcDisapprove /> },
    { name: "Complete - Success", icon: <FcOk /> },
  ];

  // Template for rendering a selected status option
  const statusOptionTemplate = (option) => {
    if (option) {
      return (
        <div className="flex align-items-center align-self-center gap-2">
          <div className="flex flex-column">{option.icon}</div>
          <div className="flex flex-column">{option.name}</div>
        </div>
      );
    }
  };

  const statusValueTemplate = (option) => {
    if (option === null) {
      return (
        <div className="flex align-items-center align-self-center gap-2">
          <div className="flex flex-column">
            <FcExpired />
          </div>
          <div className="flex flex-column">Status Not Set</div>
        </div>
      );
    }
    if (option) {
      return (
        <div className="flex align-items-center align-self-center gap-2">
          <div className="flex flex-column">{option.icon}</div>
          <div className="flex flex-column">{option.name}</div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-column m-2 min-w-full fadein animation-duration-500 gap-1">
      <div className="flex w-full">
        <SecHeading
          svgIcon={<HAIcon size={"25em"} />}
          heading="New Hit Assessment"
          color={appColors.sectionHeadingBg.ha}
          displayHorizon={false}
        />
      </div>
      <div className="flex w-full  border-1 border-50">
        {baseHitData == null ? (
          <FHaNewHitPicker
            baseHitData={baseHitData}
            setBaseHitData={setBaseHitData}
          />
        ) : (
          <FHANewBaseHitData baseHitData={baseHitData} />
        )}
      </div>
      <div className="flex w-full border-1 border-50">
        <div className="flex w-3">
          <Divider align="center" type="solid">
            Project Details
          </Divider>
        </div>
        <div className="flex w-9 p-4 m-4">
          <form onSubmit={formik.handleSubmit} className="p-fluid w-full">
            <div className="field">
              <label
                htmlFor="name"
                className={classNames({
                  "p-error": isInvalid("name"),
                })}
              >
                Name *
              </label>
              <InputText
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isInvalid("name"),
                })}
              />
            </div>

            <div className="field">
              <label
                htmlFor="primaryOrgId"
                className={classNames({
                  "p-error": isInvalid("primaryOrgId"),
                })}
              >
                Primary Organization
              </label>

              <InputOrg
                value={formik.values.primaryOrgId}
                onChange={formik.handleChange("primaryOrgId")}
                className={classNames({
                  "p-invalid": isInvalid("primaryOrgId"),
                })}
              />
              {getErrorMessage("primaryOrgId")}
            </div>

            <div className="field">
              <label
                htmlFor="participatingOrgs"
                className={classNames({
                  "p-error": isInvalid("participatingOrgs"),
                })}
              >
                Participating Organization
              </label>

              <InputMultiOrg
                value={formik.values.participatingOrgs}
                onChange={formik.handleChange("participatingOrgs")}
                className={classNames({
                  "p-invalid": isInvalid("participatingOrgs"),
                })}
              />
              {getErrorMessage("participatingOrgs")}
            </div>

            <div className="field">
              <label
                htmlFor="hAStatus"
                className={classNames({
                  "p-error": isInvalid("hAStatus"),
                })}
              >
                Status
              </label>
              <Dropdown
                id="hAStatus"
                answer="name"
                optionLabel="name"
                optionValue="name"
                options={statusOptions}
                itemTemplate={statusOptionTemplate}
                valueTemplate={statusValueTemplate}
                value={formik.values.hAStatus}
                placeholder="Select a status"
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isInvalid("hAStatus"),
                })}
              />

              {getErrorMessage("hAStatus")}
            </div>

            <div className="field">
              <label
                htmlFor="hADescription"
                className={classNames({
                  "p-error": isInvalid("hADescription"),
                })}
              >
                HA Description
              </label>
              <InputTextarea
                id="hADescription"
                answer="hADescription"
                value={formik.values.hADescription}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isInvalid("hADescription"),
                })}
              />
            </div>

            <Button
              icon="icon icon-common icon-database-submit"
              type="submit"
              label="Create Hit Assessment"
              className="p-mt-2"
              loading={isAddingHA}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(FHANew);