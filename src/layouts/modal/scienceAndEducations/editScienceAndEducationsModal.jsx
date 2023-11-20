import React, { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import Editor from "../../../common/editor/editor";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
const EditScienceAndEducationModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    regionsDropdownData,
    speciesDropdownData,
    organizationsDropdownData,
    setSelectScienceAndEducations,
    selectScienceAndEducations,
    scienceCategoryDropdownData,
    selectedImage,
    setSelectedImage,
    handleSubmit,
    editorLoaded,
    setEditorLoaded,
    setEditorData,
    editorData,
  } = props;

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const [imgSrc, setImgSrc] = useState(null);

  const customStyles1 = {
    indicatorSeparator: (styles) => ({ display: "none" }),
    option: (provided, state) => ({
      ...provided,
      "&:hover": {
        backgroundColor: "#47ad1d",
        color: "#fff",
      },
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      color: state.isSelected ? "#fff" : "black",
      backgroundColor: state.isSelected ? "#47ad1d" : provided.backgroundColor,
      // maxHeight: "84px",
    }),
    control: (base, state) => ({
      ...base,
      // height: 60,
      minHeight: 42,
      borderColor: state.isFocused ? "#47AD1D" : "#e4e4e4",
      boxShadow: state.isFocused ? "0 0 0 0.5px #47AD1D" : "0",
      border: state.isHovered ? "0" : "1px solid #e4e4e4",

      "&:hover": {
        borderColor: state.isFocused ? "#47AD1D" : "0",
        boxShadow: state.isFocused ? "0 0 0 0.5px #47AD1D" : "0",
      },
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      "&:hover": {
        backgroundColor: "rgb(95, 50, 187, 10%)",
        color: "#6119c0",
      },
    }),
  };

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
        <h5 className="offcanvas-title">Edit a Science and Education</h5>
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
          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Name
            </label>
            <input
              value={
                selectScienceAndEducations && selectScienceAndEducations.name ? selectScienceAndEducations.name : ""
              }
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectScienceAndEducations };
                data.name = e.target.value;
                setSelectScienceAndEducations(data);
              }}
            />
            {error && error.name ? <p style={{ color: "red" }}>{error.name}</p> : ""}
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Regions
            </label>
            <Select
              value={
                selectScienceAndEducations &&
                selectScienceAndEducations.regions &&
                selectScienceAndEducations.regions.length > 0 &&
                selectScienceAndEducations.regions.map((item) =>
                  item.country == "US"
                    ? { state: item.state + ", United States", _id: item._id }
                    : { state: item.state, _id: item._id },
                )
              }
              className="basic-single"
              classNamePrefix="select-search"
              isMulti
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.state}
              getOptionValue={(option) => option._id}
              options={regionsDropdownData}
              name={regionsDropdownData && regionsDropdownData.state}
              onChange={(event) => {
                const data = { ...selectScienceAndEducations };
                data.regions = event;
                setSelectScienceAndEducations({ ...data });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Species
            </label>
            <Select
              value={
                selectScienceAndEducations && selectScienceAndEducations.species
                  ? selectScienceAndEducations.species
                  : ""
              }
              className="basic-single"
              classNamePrefix="select-search"
              isMulti
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={speciesDropdownData}
              name={speciesDropdownData && speciesDropdownData.name}
              onChange={(event) => {
                const data = { ...selectScienceAndEducations };
                data.species = event;
                setSelectScienceAndEducations({ ...data });
              }}
            />
          </div>

          <div className="form-group mb-30">
            <label htmlFor="type" className="form-label">
              Organizations
            </label>
            <Select
              value={
                selectScienceAndEducations && selectScienceAndEducations.organizations
                  ? selectScienceAndEducations.organizations
                  : ""
              }
              className="basic-single"
              classNamePrefix="select-search"
              isMulti
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={organizationsDropdownData}
              name={organizationsDropdownData && organizationsDropdownData.name}
              onChange={(event) => {
                const data = { ...selectScienceAndEducations };
                data.organizations = event;
                setSelectScienceAndEducations({ ...data });
              }}
            />
          </div>

          <div className="form-group mb-30">
            <label htmlFor="type" className="form-label">
              Category
            </label>
            <Select
              value={{
                name: selectScienceAndEducations?.scienceAndEducationCategoryName
                  ? selectScienceAndEducations?.scienceAndEducationCategoryName[0].toUpperCase() + selectScienceAndEducations?.scienceAndEducationCategoryName.slice(1).toLowerCase()
                  : "",
                value: selectScienceAndEducations?.scienceAndEducationCategory,
              }}
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={scienceCategoryDropdownData}
              name={scienceCategoryDropdownData && scienceCategoryDropdownData.name}
              onChange={(event) => {
                const data = { ...selectScienceAndEducations };
                data.scienceAndEducationCategoryName = event.name;
                data.scienceAndEducationCategory = event._id;
                setSelectScienceAndEducations(data);
              }}
            />
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
                    const data = { ...selectScienceAndEducations };
                    data.newImage = true;
                    data.coverImage = {};
                    setSelectedImage(e.target.files[0]);
                    setSelectScienceAndEducations(data);
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setImgSrc(reader.result);
                    };
                  }}
                />
                <span id="upload-file-name" className="d-flex align-items-center">
                  {selectScienceAndEducations && selectScienceAndEducations.newImage && selectedImage
                    ? selectedImage.name.length > 40
                      ? selectedImage.name.substring(0, 40) + "..."
                      : selectedImage.name
                    : selectScienceAndEducations &&
                      selectScienceAndEducations.coverImage &&
                      selectScienceAndEducations.coverImage.original
                      ? selectScienceAndEducations.coverImage.original.length > 40
                        ? selectScienceAndEducations.coverImage.original.substring(0, 40) + "..."
                        : selectScienceAndEducations.coverImage.original
                      : ""}

                  {(selectScienceAndEducations &&
                    selectScienceAndEducations.coverImage &&
                    selectScienceAndEducations.coverImage.original) ||
                    selectedImage ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectScienceAndEducations };
                        data.coverImage = {};
                        data.newImage = false;
                        setSelectScienceAndEducations(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 570px * 536px</p>
                  )}
                </span>
              </span>
            </div>
          </div>
          {selectScienceAndEducations && selectScienceAndEducations.coverImage ? (
            <>
              {selectScienceAndEducations &&
                selectScienceAndEducations.coverImage &&
                selectScienceAndEducations.coverImage.original ? (
                <div className="td-img-dev mt-3 mb-3">
                  <img
                    src={
                      process.env.REACT_APP_MEDIA +
                      `${selectScienceAndEducations &&
                      selectScienceAndEducations.coverImage &&
                      selectScienceAndEducations.coverImage.small
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
                      <img src={imgSrc} alt="Image Preview" style={{ border: "solid 1px #dee2e6" }} />
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            ""
          )}
          {error && error.image ? <p style={{ color: "red" }}>{error.image}</p> : ""}

          <div className="mb-30">
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
            selectScienceAndEducations &&
              selectScienceAndEducations.regions &&
              selectScienceAndEducations.regions.length !== 0
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

export default EditScienceAndEducationModal;
