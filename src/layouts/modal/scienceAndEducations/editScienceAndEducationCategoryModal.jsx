import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import NextButton from "../../../common/form/nextButton";
const EditScienceAndEducationCategoryModal = (props) => {
  const { show, onHide, loading, selectScienceCategory, setSelectScienceCategory, handleSubmit } = props;
  return (
    <Offcanvas
      placement="end"
      backdropclassName="upload-documnets-backdrop"
      show={show}
      onHide={() => onHide()}
      className="offcanvas offcanvas-end border-0"
      id="uploadDocumentOffcanvas"
      enforceFocus={false}
    >
      <Offcanvas.Header className="offcanvas-header filter-margin">
        <h5 className="offcanvas-title">Edit a Science And Education Category </h5>
        <button
          type="button"
          className="offcanvas-close-btn d-flex align-items-center justify-content-center"
          onClick={() => onHide()}
        >
          <img src={close} alt="" />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className="offcanvas-body p-0">
        <div className="offcanvas-widget-row pt-0 filter-margin">
          <div className="form-group mb-30">
            <label htmlFor="speciesCategory" className="form-label">
              Science And Education Category
            </label>
            <input
              value={selectScienceCategory && selectScienceCategory.name ? selectScienceCategory.name : ""}
              type="text"
              className="form-control text-in"
              id="name"
              onChange={(e) => {
                const data = { ...selectScienceCategory };
                data.name = e.target.value;
                setSelectScienceCategory(data);
              }}
            />
          </div>
        </div>
      </Offcanvas.Body>

      <div className="offcanvas-footer">
        <NextButton
          label="Save"
          classData={
            selectScienceCategory && selectScienceCategory.name
              ? "btn btn-default btn-block "
              : "btn btn-default btn-block disabled"
          }
          handleSubmit={(e) => handleSubmit(e)}
          loading={loading}
        />
      </div>
    </Offcanvas>
  );
};

export default EditScienceAndEducationCategoryModal;
