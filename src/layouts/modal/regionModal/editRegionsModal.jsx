import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import { useState } from "react";
import Editor from "../../../common/editor/editor";
const EditRgionsModal = (props) => {
  const {
    show,
    onHide,
    countryDropDown,
    stateDropDown,
    selectCountry,
    editHandler,
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
  const [imgSrc, setImgSrc] = useState(null);


  return (
    <Offcanvas
      placement="end"
      backdropclassName="upload-documnets-backdrop"
      show={show}
      onHide={() => onHide()}
      className="offcanvas offcanvas-end border-0"
      id="editRegion"
      enforceFocus={false}
    >
      <Offcanvas.Header className="offcanvas-header filter-margin">
        <h5 className="offcanvas-title">Edit a Region</h5>
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
              value={{
                name: selectedEditItem?.countryName,
                value: selectedEditItem?.country,
              }}
              className="basic-single react-select-z-index region-country-z-index"
              classNamePrefix="select-search react-select-z-index region-country-z-index"
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

          {selectedEditItem &&
            selectedEditItem?.country &&
            selectedEditItem?.country === "US" ? (
            <>
              <div className="mb-20">
                <label htmlFor="selectState" className="form-label">
                  Select State
                </label>
                <Select
                  value={
                    selectedEditItem?.country === "US"
                      ? {
                        name: selectedEditItem?.state,
                        value: selectedEditItem?.stateId,
                      }
                      : ""
                  }
                  className="basic-single region-state-z-index"
                  classNamePrefix="select-search region-state-z-index"
                  placeholder="Select"
                  styles={customStyles}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  options={stateDropDown}
                  name={stateDropDown.id}
                  onChange={(event) => {
                    const data = { ...selectedEditItem };
                    data.state = event.name;
                    data.stateId = event.id;
                    setSelectedEditItem(data);
                  }}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <div className="mb-10">
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
                    data.coverImage = {};
                    setSelectedEditItem(data);
                    setSelectedImage(e.target.files[0]);
                    const file = e.target.files[0];
                    let reader = new FileReader();
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
                  {selectedEditItem &&
                    selectedEditItem.newImage &&
                    selectedImage
                    ? selectedImage.name.length > 40
                      ? selectedImage.name.substring(0, 40) + "..."
                      : selectedImage.name
                    : selectedEditItem &&
                      selectedEditItem.coverImage &&
                      selectedEditItem.coverImage.original
                      ? selectedEditItem.coverImage.original.length > 40
                        ? selectedEditItem.coverImage.original.substring(0, 40) +
                        "..."
                        : selectedEditItem.coverImage.original
                      : ""}
                  {(selectedEditItem &&
                    selectedEditItem.coverImage &&
                    selectedEditItem.coverImage.original) ||
                    selectedImage ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectedEditItem };
                        data.newImage = false;
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
          </div>

          {selectedEditItem && selectedEditItem.coverImage ? (
            <>
              {selectedEditItem &&
                selectedEditItem.coverImage &&
                selectedEditItem.coverImage.original ? (
                <div className="td-img-dev mt-3 mb-3">
                  <img
                    src={
                      process.env.REACT_APP_MEDIA +
                      `${selectedEditItem &&
                      selectedEditItem.coverImage &&
                      selectedEditItem.coverImage.small
                      }`
                    }
                    alt=""
                    style={{ border: "solid 1px #dee2e6" }}
                  />
                </div>
              ) : (
                <>
                  {selectedImage !== null && imgSrc && (
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
          handleSubmit={(e) => editHandler(e)}
          loading={loading}
        />
      </div>
    </Offcanvas>
  );
};

export default EditRgionsModal;
