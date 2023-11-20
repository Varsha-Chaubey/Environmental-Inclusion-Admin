import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
const EditReportsModal = (props) => {
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
    organizationsDropdown,
  } = props;
  const [imgSrc, setImgSrc] = useState(null);
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
        <h5 className="offcanvas-title">Edit a Report</h5>
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
              value={selectReports?.name}
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
              value={selectReports?.reportedBy}
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
              value={{
                name: selectReports?.organization?.name,
                value: selectReports?.organization?._id,
              }}
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
                    data.file = {};
                    setSelectedFile(e.target.files[0]);
                    setSelectReports(data);
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setImgSrc(reader.result);
                    };
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectReports && selectReports.newfile && selectedFile
                    ? selectedFile.name.length > 40
                      ? selectedFile.name.substring(0, 40) + "..."
                      : selectedFile.name
                    : selectReports &&
                      selectReports.file &&
                      selectReports.file.original
                    ? selectReports.file.original.length > 40
                      ? selectReports.file.original.substring(0, 40) + "..."
                      : selectReports.file.original
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
                        data.newfile = false;
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
          </div>
          {selectReports && selectReports.file ? (
            <>
              {selectReports &&
              selectReports.file &&
              selectReports.file.original ? (
                <div className="td-img-dev mt-3 mb-3">
                  <img
                    src={
                      process.env.REACT_APP_MEDIA +
                      `${
                        selectReports &&
                        selectReports.file &&
                        selectReports.file.original
                      }`
                    }
                    alt=""
                    style={{ border: "solid 1px #dee2e6" }}
                  />
                </div>
              ) : (
                <>
                  {selectedFile !== null && imgSrc && (
                    <div className="td-img-dev mt-3 mb-3">
                      <img
                        src={imgSrc}
                        alt="Image Preview"
                        style={{ border: "solid 1px #dee2e6" }}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            ""
          )}
          {error && error.image ? (
            <p style={{ color: "red" }}>{error.image}</p>
          ) : (
            ""
          )}
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

export default EditReportsModal;
