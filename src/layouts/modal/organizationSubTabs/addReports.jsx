import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
const AddReportsModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    selectReports,
    setSelectReports,
    selectedFile,
    setSelectedFile,
    handleSubmit,
    organizationsDropdown
  } = props;

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
        <h5 className="offcanvas-title">Add a Report</h5>
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
            <label htmlFor="dangerLevel" className="form-label">
            Title 
            </label>
            <input
              type="text"
              className="form-control text-in"
              id="name"
              onChange={(e) => {
                const data = { ...selectReports };
                data.name = e.target.value;
                setSelectReports(data);
              }}
            />
            {error && error.name ? (
              <p style={{ color: "red" }}>{error.name}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group mb-30">
            <label htmlFor="dangerLevel" className="form-label">
            Report By
            </label>
            <input
              type="text"
              className="form-control text-in"
              id="name"
              onChange={(e) => {
                const data = { ...selectReports };
                data.reportedBy = e.target.value;
                setSelectReports(data);
              }}
            />
            {error && error.reportedBy ? (
              <p style={{ color: "red" }}>{error.reportedBy}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group mb-30">
            <label htmlFor="type" className="form-label">
              Organisation
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={organizationsDropdown}
              name={organizationsDropdown && organizationsDropdown.name}
              onChange={(event) => {
                const data = { ...selectReports };
                data.organization = event;               
                setSelectReports(data);
              }}
            />
             {error && error.organization ? (
              <p style={{ color: "red" }}>{error.organization}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="selectImage" className="form-label">
            File upload
            </label>
            <div className="upload-lg-button position-relative">
              <span className="file-input">
                <input
                  class="form-control position-absolute"
                  id="inputGroupFile02"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) => {
                    const data = { ...selectReports };
                    data.newfile = true;
                    setSelectedFile(e.target.files[0]);
                    setSelectReports(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedFile && selectedFile.name
                    ? selectedFile.name
                    : ""}
                  {(selectReports &&
                    selectReports.file &&
                    selectReports.file.original) ||
                  selectedFile ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectReports };
                        data.file = {};
                        setSelectReports(data);
                        setSelectedFile(null);
                      }}
                    />
                  ) : (
                    <p>Browse</p>
                  )}
                </span>
              </span>
            </div>
            {error && error.file ? (
              <p style={{ color: "red" }}>{error.file}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </Offcanvas.Body>

      <div className="offcanvas-footer">
        <NextButton
          label="Save"
          classData="btn btn-default btn-block"
          handleSubmit={(e) => handleSubmit(e)}
          loading={loading}
        />
      </div>
    </Offcanvas>
  );
};

export default AddReportsModal;
