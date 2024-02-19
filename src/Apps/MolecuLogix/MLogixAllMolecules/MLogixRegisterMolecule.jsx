import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { RootStoreContext } from "../../../RootStore";

const MLogixRegisterMolecule = ({ closeSideBar }) => {
  const rootStore = useContext(RootStoreContext);

  const { registerMolecule, isRegisteringMolecule } = rootStore.moleculeStore;

  const formik = useFormik({
    initialValues: {
      name: "",
      smiles: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required.";
      if (!values.smiles) errors.smiles = "SMILES is required.";
      // Additional validations can be added here
      return errors;
    },

    onSubmit: (newMolecule) => {
      registerMolecule(newMolecule).then(() => {
        closeSideBar();
        formik.resetForm();
      });
    },
  });

  // Helper functions for form validation and error messages
  const isInvalid = (field) => formik.touched[field] && formik.errors[field];
  const getErrorMessage = (field) =>
    isInvalid(field) && (
      <small className="p-error">{formik.errors[field]}</small>
    );

  return (
    <>
      <div className="card w-full">
        <form onSubmit={formik.handleSubmit} className="p-fluid">
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
            {getErrorMessage("name")}
          </div>

          <div className="field">
            <label
              htmlFor="smiles"
              className={classNames({
                "p-error": isInvalid("smiles"),
              })}
            >
              SMILES *
            </label>
            <InputTextarea
              id="smiles"
              answer="smiles"
              value={formik.values.smiles}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isInvalid("smiles"),
              })}
            />
            {getErrorMessage("smiles")}
          </div>

          <Button
            icon="icon icon-common icon-database-submit"
            type="submit"
            label="Register Molecule"
            className="p-mt-2"
            loading={isRegisteringMolecule}
          />
        </form>
      </div>
    </>
  );
};

export default MLogixRegisterMolecule;
