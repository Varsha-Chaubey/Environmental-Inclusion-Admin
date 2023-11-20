import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import { useEffect } from "react";
import Editor from "../../../common/editor/editor";
const AddOurProgramModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    selectOurProgram,
    setSelectOurProgram,
    selectedImage,
    setSelectedImage,
    editorData,
    setEditorData,
    editorLoaded,
    setEditorLoaded,
    handleSubmit,
    organizationsDropdown,
  } = props;

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
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
        <h5 className="offcanvas-title">Add a Program</h5>
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
                const data = { ...selectOurProgram };
                data.name = e.target.value;
                setSelectOurProgram(data);
              }}
            />
            {error && error.name ? (
              <p style={{ color: "red" }}>{error.name}</p>
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
                const data = { ...selectOurProgram };
                data.organization = event;
                setSelectOurProgram(data);
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
              Image
            </label>
            <div className="upload-lg-button position-relative">
              <span className="file-input">
                <input
                  class="form-control position-absolute"
                  id="inputGroupFile02"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) => {
                    const data = { ...selectOurProgram };
                    data.newImage = true;
                    setSelectedImage(e.target.files[0]);
                    setSelectOurProgram(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedImage && selectedImage.name
                    ? selectedImage.name
                    : ""}
                  {(selectOurProgram &&
                    selectOurProgram.coverImage &&
                    selectOurProgram.coverImage.original) ||
                  selectedImage ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectOurProgram };
                        data.coverImage = {};
                        setSelectOurProgram(data);
                        setSelectedImage(null);
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

          <div className=" mb-20">
            <label htmlFor="regionDescription" className="form-label">
              Description
            </label>
            <div class="fwtr-input-box flex-grow-1">
              <Editor
                id="textarea"
                name="description"
                className="ck-content des-height"
                onChange={(data) => {
                  setEditorData(data);
                }}
                editorLoaded={editorLoaded}
                value={editorData}
              />
            </div>
            {error && error.description ? (
              <p style={{ color: "red" }}>{error.description}</p>
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

export default AddOurProgramModal;
