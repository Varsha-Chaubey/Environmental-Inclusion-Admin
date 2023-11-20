import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
const AddMedia = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    selectMedia,
    setSelectMedia,
    selectedFiles,
    setSelectedFiles,
    organizationsDropdown,
    handleSubmit,
  } = props;

  const handleFileUpload = (event) => {
    let images = [];
    for (let i = 0; i < event.target.files?.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }
    setSelectedFiles(event.target.files);
  };

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
        <h5 className="offcanvas-title">Add Media</h5>
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
                const data = { ...selectMedia };
                data.organization = event;
                setSelectMedia(data);
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
              Add File
            </label>
            <div className="upload-lg-button position-relative">
              <span className="file-input">
                <input
                  multiple
                  class="form-control position-absolute"
                  id="inputGroupFile02"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={handleFileUpload}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedFiles && selectedFiles.length >= 2
                    ? `${
                        selectedFiles && selectedFiles && selectedFiles[0]?.name
                      } , 
                   ${
                     selectedFiles && selectedFiles && selectedFiles[1]?.name
                   }... `
                    : selectedFiles && selectedFiles[0]?.name}
                  {selectedFiles ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectMedia };
                        data.files = {};
                        setSelectMedia(data);
                        setSelectedFiles(null);
                      }}
                    />
                  ) : (
                    <p>Browse</p>
                  )}
                </span>
              </span>
            </div>
            {error && error.image ? (
              <p style={{ color: "red" }}>{error.image}</p>
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

export default AddMedia;
