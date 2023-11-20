import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import { useEffect } from "react";
import Editor from "../../../common/editor/editor";
const AddOurWorkModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    selectOurWork,
    setSelectOurWork,
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
        <h5 className="offcanvas-title">Add a Work</h5>
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
                const data = { ...selectOurWork };
                data.name = e.target.value;
                setSelectOurWork(data);
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
                const data = { ...selectOurWork };
                data.organization = event;
                setSelectOurWork(data);
              }}
            />
             {error && error.organization ? (
              <p style={{ color: "red" }}>{error.organization}</p>
            ) : (
              ""
            )}
          </div>

          <div className=" mb-30">
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

export default AddOurWorkModal;
