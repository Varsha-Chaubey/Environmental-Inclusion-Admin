import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import Editor from "../../../common/editor/editor";
const AddEnvironmentalistModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    editorLoaded,
    setEditorLoaded,
    editorData,
    setEditorData,
    regionsDropdownData,
    speciesDropdownData,
    organizationDropdownData,
    selectEnvironmentalist,
    setSelectEnvironmentalist,
    selectedImage,
    handleSubmit,
    selectedDetailImage,
    setSelectedDetailImage,
    setSelectedImage,
    setSelectSocialMedia,
    selectSocialMedia,
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
        <h5 className="offcanvas-title">Add an Environmentalist</h5>
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
              type="text"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectEnvironmentalist };
                data.name = e.target.value;
                setSelectEnvironmentalist(data);
              }}
            />
            {error && error.name ? (
              <p style={{ color: "red" }}>{error.name}</p>
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
                const data = { ...selectEnvironmentalist };
                data.regions = event;
                setSelectEnvironmentalist({ ...data });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Species
            </label>
            <Select
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
                const data = { ...selectEnvironmentalist };
                data.species = event;
                setSelectEnvironmentalist({ ...data });
              }}
            />
          </div>

          <div className="form-group mb-30">
            <label htmlFor="type" className="form-label">
              Organizations
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select-search"
              isMulti
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={organizationDropdownData}
              name={organizationDropdownData && organizationDropdownData.name}
              onChange={(event) => {
                const data = { ...selectEnvironmentalist };
                data.organizations = event;
                setSelectEnvironmentalist({ ...data });
              }}
            />
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Movements
            </label>
            <input
              type="text"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectEnvironmentalist };
                let array = e.target.value.split(",");
                const objects = array.map((val, i) => {
                  return { name: val };
                });
                data.movements = objects;
                setSelectEnvironmentalist(data);
              }}
            />
            {error && error.movements ? (
              <p style={{ color: "red" }}>{error.movements}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Founded Organizations
            </label>
            <input
              type="text"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectEnvironmentalist };
                let array = e.target.value.split(",");
                const objects = array.map((val, i) => {
                  return { name: val };
                });
                data.foundedOrganizations = objects;
                setSelectEnvironmentalist(data);
              }}
            />
            {error && error.foundedOrganizations ? (
              <p style={{ color: "red" }}>{error.foundedOrganizations}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Awards
            </label>
            <input
              type="text"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectEnvironmentalist };
                let array = e.target.value.split(",");
                const objects = array.map((val, i) => {
                  return { name: val };
                });
                data.awards = objects;
                setSelectEnvironmentalist(data);
              }}
            />
            {error && error.awards ? (
              <p style={{ color: "red" }}>{error.awards}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Years of Active
            </label>
            <input
              type="text"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectEnvironmentalist };
                data.yearsActive = e.target.value;
                setSelectEnvironmentalist(data);
              }}
            />
            {error && error.yearsActive ? (
              <p style={{ color: "red" }}>{error.yearsActive}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Facebook bio URL
            </label>
            <input
              type="text"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectSocialMedia };
                data.facebook = e.target.value;
                setSelectSocialMedia(data);
              }}
            />
            {error && error.facebook ? (
              <p style={{ color: "red" }}>{error.facebook}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Twitter bio URL
            </label>
            <input
              type="text"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectSocialMedia };
                data.twitter = e.target.value;
                setSelectSocialMedia(data);
              }}
            />
            {error && error.twitter ? (
              <p style={{ color: "red" }}>{error.twitter}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Instagram bio URL
            </label>
            <input
              type="text"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectSocialMedia };
                data.instagram = e.target.value;
                setSelectSocialMedia(data);
              }}
            />
            {error && error.instagram ? (
              <p style={{ color: "red" }}>{error.instagram}</p>
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
                    const data = { ...selectEnvironmentalist };
                    data.newImage = true;
                    setSelectedImage(e.target.files[0]);
                    setSelectEnvironmentalist(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedImage && selectedImage.name}
                  {(selectEnvironmentalist &&
                    selectEnvironmentalist.coverImage &&
                    selectEnvironmentalist.coverImage.original) ||
                  (selectedImage && selectedImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectEnvironmentalist };
                        data.coverImage = {};
                        setSelectEnvironmentalist(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 402px * 519px</p>
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
                    const data = { ...selectEnvironmentalist };
                    data.newDetailImage = true;
                    setSelectedDetailImage(e.target.files[0]);
                    setSelectEnvironmentalist(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedDetailImage && selectedDetailImage.name}
                  {(selectEnvironmentalist &&
                    selectEnvironmentalist.detailTabImage &&
                    selectEnvironmentalist.detailTabImage.original) ||
                  (selectedDetailImage && selectedDetailImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectEnvironmentalist };
                        data.detailTabImage = {};
                        setSelectEnvironmentalist(data);
                        setSelectedDetailImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 486px * 574px</p>
                  )}
                </span>
              </span>
            </div>
            {error && error.detailImage ? (
              <p style={{ color: "red" }}>{error.detailImage}</p>
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
                className="ck-content"
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
            selectEnvironmentalist &&
            selectEnvironmentalist.regions &&
            selectEnvironmentalist.regions.length !== 0
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

export default AddEnvironmentalistModal;
