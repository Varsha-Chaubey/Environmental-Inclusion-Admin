import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import Editor from "../../../common/editor/editor";
const AddSpeciesModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    regionsDropdownData,
    dangerDropdownData,
    categoriesDropdownData,
    selectSpecies,
    setSelectSpecies,
    selectedImage,
    setSelectedImage,
    handleSubmit,
    editorLoaded,
    setEditorLoaded,
    setEditorData,
    editorData,
    selectDetailTabImage,
    setSelectDetailTabImage
  } = props;

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
      id="editRegion"
      enforceFocus={false}
    >
      <Offcanvas.Header className="offcanvas-header filter-margin">
        <h5 className="offcanvas-title">Add a Species</h5>
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
              Species
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.name = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.name ? (
              <p style={{ color: "red" }}>{error.name}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Scientific Name
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.scientificName = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.scientificName ? (
              <p style={{ color: "red" }}>{error.scientificName}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Regions
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select-search"
              isMulti
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.state}
              getOptionValue={(option) => option._id}
              options={regionsDropdownData}
              name={regionsDropdownData && regionsDropdownData.name}
              onChange={(event) => {
                const data = { ...selectSpecies };
                data.regions = event;
                setSelectSpecies({ ...data });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Danger Level Species
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={dangerDropdownData}
              name={dangerDropdownData && dangerDropdownData.name}
              onChange={(event) => {
                const data = { ...selectSpecies };
                data.dangerSpeciesName = event.name;
                data.dangerSpeciesId = event.id;
                setSelectSpecies(data);
              }}
            />
          </div>

          <div className="form-group mb-30">
            <label htmlFor="type" className="form-label">
              Species Category
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={categoriesDropdownData}
              onChange={(event) => {
                const data = { ...selectSpecies };
                data.categoriesSpeciesName = event.name;
                data.categoriesSpeciesId = event.id;
                setSelectSpecies(data);
              }}
            />
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Population
            </label>
            <input
              type="number"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.population = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.population ? (
              <p style={{ color: "red" }}>{error.population}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Habitat
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.habitat = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.habitat ? (
              <p style={{ color: "red" }}>{error.habitat}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Life Span
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.lifeSpan = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.lifeSpan ? (
              <p style={{ color: "red" }}>{error.lifeSpan}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Weight
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.weight = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.weight ? (
              <p style={{ color: "red" }}>{error.weight}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Natural Threat
            </label>
            <textarea
              type="text"
              className="form-control w-100 text-in text-area-h130"
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.naturalThreat = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.naturalThreat ? (
              <p style={{ color: "red" }}>{error.naturalThreat}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Human Threat
            </label>
            <textarea
              type="text"
              className="form-control w-100 text-in text-area-h130"
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.humanThreat = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.humanThreat ? (
              <p style={{ color: "red" }}>{error.humanThreat}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Climate Change Threat
            </label>
            <textarea
              type="text"
              className="form-control w-100 text-in text-area-h130"
              onChange={(e) => {
                const data = { ...selectSpecies };
                data.climateChangeThreat = e.target.value;
                setSelectSpecies(data);
              }}
            />
            {error && error.climateChangeThreat ? (
              <p style={{ color: "red" }}>{error.climateChangeThreat}</p>
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
                    const data = { ...selectSpecies };
                    data.newImage = true;
                    setSelectedImage(e.target.files[0]);
                    setSelectSpecies(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedImage && selectedImage.name}
                  {(selectSpecies &&
                    selectSpecies.coverImage &&
                    selectSpecies.coverImage.original) ||
                    (selectedImage && selectedImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectSpecies };
                        data.coverImage = {};
                        setSelectSpecies(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 450px * 519px</p>
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


          <div className="mb-30">
            <label htmlFor="selectImage" className="form-label">
            Detail Tab Image
            </label>
            <div className="upload-lg-button position-relative">
              <span className="file-input">
                <input
                  class="form-control position-absolute"
                  id="inputGroupFile02"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) => {
                    const data = { ...selectSpecies };
                    data.detailImage = true;
                    setSelectDetailTabImage(e.target.files[0]);
                    setSelectSpecies(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectDetailTabImage && selectDetailTabImage.name}
                  {(selectSpecies &&
                    selectSpecies.detailTabImage &&
                    selectSpecies.detailTabImage.original) ||
                    (selectDetailTabImage && selectDetailTabImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectSpecies };
                        data.detailTabImage = {};
                        setSelectSpecies(data);
                        setSelectDetailTabImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 546px * 660px</p>
                  )}
                </span>
              </span>
            </div>
            {error && error.detailTabImage ? (
              <p style={{ color: "red" }}>{error.detailTabImage}</p>
            ) : (
              ""
            )}
          </div>

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
          classData={
            (selectSpecies &&
              selectSpecies.regions &&
              selectSpecies.regions.length !== 0) &&
              (selectSpecies &&
                selectSpecies.dangerSpeciesName &&
                selectSpecies.dangerSpeciesName.length !== 0) &&
              (selectSpecies &&
                selectSpecies.categoriesSpeciesName &&
                selectSpecies.categoriesSpeciesName.length !== 0)
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

export default AddSpeciesModal;
