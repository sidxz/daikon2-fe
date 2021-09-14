import React, { useRef } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import SectionHeading from "../../app/common/SectionHeading/SectionHeading";

const FHA = ({history}) => {
    const toast = useRef(null);
  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "FHA Screen",
          icon: "icon icon-common icon-classification",
        },
      ],
    },
  ];

  const breadCrumbItems = [
    {
      label: "FHA",
      command: () => {
        history.push("/fha/");
      },
    },
  ];

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <br />
      <div className="p-d-flex">
        <div className="p-mr-2">
          <Menu model={items} />
        </div>
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <BreadCrumb model={breadCrumbItems} />
            </div>
            <div className="p-mb-2" style={{ width: "1000px" }}>
                <SectionHeading
                  icon="icon icon-common icon-classification"
                  heading={"FHA"}
                  
                />
              </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FHA;