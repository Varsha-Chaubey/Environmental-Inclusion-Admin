import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import Editor from "../../../common/editor/editor";
const AddRigonModal = (props) => {
  const {
    show,
    onHide,
    countryDropDown,
    stateDropDown,
    selectCountry,
    handleAddRegion,
    loading,
    error,
    selectedEditItem,
    setSelectedEditItem,
    selectedImage,
    setSelectedImage,
    editorLoaded,
    setEditorLoaded,
    setEditorData,
    editorData,
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
      id="addRegion"
      enforceFocus={false}
    >
      <Offcanvas.Header className="offcanvas-header filter-margin">
        <h5 className="offcanvas-title">Add a Region</h5>
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
          <div className="mb-20 ">
            <label htmlFor="selectCountry" className="form-label">
              Select Country
            </label>
            <Select
              className="basic-single react-select-z-index"
              classNamePrefix="select-search react-select-z-index"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.code}
              options={countryDropDown}
              name={selectCountry && selectCountry.id}
              onChange={(event) => {
                const data = { ...selectedEditItem };
                data.countryName = event.name;
                data.country = event.code;
                setSelectedEditItem(data);
              }}
            />
          </div>

          {selectedEditItem && selectedEditItem?.country && selectedEditItem?.country === "US" ? (
            <>
              <div className="mb-20">
                <label htmlFor="selectState" className="form-label">
                  Select State
                </label>
                <Select
                  className="basic-single  region-state-z-index"
                  classNamePrefix="select-search  region-state-z-index"
                  placeholder="Select"
                  styles={customStyles}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  options={stateDropDown}
                  name={stateDropDown.id}
                  onChange={(event) => {
                    const data = { ...selectedEditItem };
                    data.name = event.name;
                    data.value = event.id;
                    setSelectedEditItem(data);
                  }}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <div className="mb-20">
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
                    const data = { ...selectedEditItem };
                    data.newImage = true;
                    setSelectedImage(e.target.files[0]);
                    setSelectedEditItem(data);
                  }}
                />
                <span id="upload-file-name" className="d-flex align-items-center">
                  {selectedImage && selectedImage.name}
                  {(selectedEditItem && selectedEditItem.coverImage && selectedEditItem.coverImage.original) ||
                    (selectedImage && selectedImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectedEditItem };
                        data.coverImage = {};
                        setSelectedEditItem(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 402px * 519px</p>
                  )}
                </span>
              </span>
            </div>
            {error && error.image ? <p style={{ color: "red" }}>{error.image}</p> : ""}
          </div>
          <div className="mb-20">
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

            {error && error.description ? <p style={{ color: "red" }}>{error.description}</p> : ""}
          </div>
        </div>
      </Offcanvas.Body>

      <div className="offcanvas-footer">
        <NextButton
          label="Save"
          classData={
            selectedEditItem && selectedEditItem.countryName && selectedEditItem.countryName.length !== 0 &&
              editorData && editorData.length !== 0
              ? "btn btn-default btn-block "
              : "btn btn-default btn-block disabled"
          }
          handleSubmit={(e) => handleAddRegion(e)}
          loading={loading}
        />
      </div>
    </Offcanvas>
  );
};

export default AddRigonModal;
