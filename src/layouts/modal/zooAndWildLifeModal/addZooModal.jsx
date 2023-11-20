import React, { useEffect, useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import Editor from "../../../common/editor/editor";
import { getapisForDropdown, getUsCitiesDropdown } from "../../../store/apisForDropdown";
import { useState } from "react";
import { connect } from "react-redux";
import AlertError from "../../../common/alerts/alertError";
import { toast } from "react-toastify";

const AddZooModal = (props) => {
  const {
    show,
    onHide,
    loading,
    setLoadingZoosAndWildLife,
    error,
    regionsDropdownData,
    speciesDropdownData,
    organizationsDropdownData,
    countriesDropdownData,
    usStateDropdownData,
    setSelectZoo,
    selectZoo,
    selectedImage,
    setSelectedImage,
    handleSubmit,
    editorLoaded,
    setEditorLoaded,
    setEditorData,
    editorData,
    selectZooLocation,
    setSelectZooLocation
  } = props;

  var ref = useRef(null);
  const [usCitiesDropdownData, setUsCitiesDropdownData] = useState(null);
  const [stateId, setStateId] = useState();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingZoosAndWildLife(true);

    const payload = {
      id: stateId,
    };
    props.getUsCitiesDropdown(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingZoosAndWildLife(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingZoosAndWildLife(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, [stateId]);

  const cities =
    props.getapisForDropdown && props.getapisForDropdown.usCitiesItems && props.getapisForDropdown.usCitiesItems.data;

  useEffect(() => {
    const cData =
      cities &&
      cities.length > 0 &&
      cities.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    setUsCitiesDropdownData(cData);
  }, [show, loading]);

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
        <h5 className="offcanvas-title">Add a Zoo</h5>
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
              className="form-control w-100  text-in"
              onChange={(e) => {
                const data = { ...selectZoo };
                data.name = e.target.value;
                setSelectZoo(data);
              }}
            />
            {error && error.name ? <p style={{ color: "red" }}>{error.name}</p> : ""}
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
                const data = { ...selectZoo };
                data.regions = event;
                setSelectZoo({ ...data });
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
                const data = { ...selectZoo };
                data.species = event;
                setSelectZoo({ ...data });
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
              options={organizationsDropdownData}
              name={organizationsDropdownData && organizationsDropdownData.name}
              onChange={(event) => {
                const data = { ...selectZoo };
                data.organizations = event;
                setSelectZoo({ ...data });
              }}
            />
          </div>
          <div className="mb-30 " style={{ borderBottom: "1px solid #E4E4E4" }}>
            <label htmlFor="regionDescription " className="form-label fw-bold">
              Zoo Address
            </label>
          </div>
          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectZoo };
                data.address = e.target.value;
                setSelectZoo(data);
              }}
            />
            {error && error.address ? <p style={{ color: "red" }}>{error.address}</p> : ""}
          </div>

          <div className="form-group mb-30">
            <label htmlFor="type" className="form-label">
              Country
            </label>
            <Select
              className="basic-single "
              classNamePrefix="select-search "
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={countriesDropdownData}
              name={countriesDropdownData && countriesDropdownData.id}
              onChange={(event) => {
                let data = { ...selectZooLocation };
                data.countryName = event.name;
                data.country = event.code;
                data.countryID = event.id;
                setSelectZooLocation(data);
              }}

            />
          </div>

          {(selectZooLocation &&
            selectZooLocation?.country &&
            selectZooLocation?.country === "US") ||
            (selectZooLocation &&
              selectZooLocation?.countryName &&
              selectZooLocation?.countryName === "United States") ? (
            <>
              <div className="mb-30">
                <label htmlFor="selectState" className="form-label">
                  State
                </label>
                <Select
                  className="basic-single "
                  classNamePrefix="select-search "
                  placeholder="Select"
                  styles={customStyles}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  options={usStateDropdownData}
                  name={usStateDropdownData && usStateDropdownData.id}
                  onChange={(event) => {
                    const data = { ...selectZooLocation };
                    data.stateName = event.name;
                    data.stateID = event.id;
                    setStateId(event.id);
                    setSelectZooLocation(data);
                  }}

                />
              </div>
            </>
          ) : (
            <div className="mb-30">
              <label htmlFor="regionDescription" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control w-100 text-in"
                onChange={(e) => {
                  const data = { ...selectZooLocation };
                  data.stateName = e.target.value;
                  setSelectZooLocation(data);
                }}
              />
              {error && error.stateName ? (
                <p style={{ color: "red" }}>{error.stateName}</p>
              ) : (
                ""
              )}
            </div>
          )}

          {((selectZooLocation &&
            selectZooLocation?.country &&
            selectZooLocation?.country === "US") ||
            (selectZooLocation &&
              selectZooLocation?.countryName &&
              selectZooLocation?.countryName === "United States")) || stateId ? (
            <>
              <div className="mb-30">
                <label htmlFor="selectState" className="form-label">
                  City
                </label>
                <Select
                  className="basic-single "
                  classNamePrefix="select-search "
                  placeholder="Select"
                  styles={customStyles}
                  getOptionLabel={(option) => option?.name}
                  getOptionValue={(option) => option?.id}
                  options={usCitiesDropdownData}
                  name={usCitiesDropdownData?.id}
                  onChange={(event) => {
                    const data = { ...selectZooLocation };
                    data.cityName = event.name;
                    data.cityID = event.id;
                    setSelectZooLocation(data);
                  }}
                />
              </div>
            </>
          ) : (
            <div className="mb-30">
              <label htmlFor="regionDescription" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control w-100 text-in"
                onChange={(e) => {
                  const data = { ...selectZooLocation };
                  data.cityName = e.target.value;
                  setSelectZooLocation(data);
                }}

              />
              {error && error.cityName ? (
                <p style={{ color: "red" }}>{error.cityName}</p>
              ) : (
                ""
              )}

            </div>
          )}

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Zip Code
            </label>
            <input
              type="number"
              className="form-control w-100 text-in"
              onChange={(e) => {
                const data = { ...selectZoo };
                data.zipCode = e.target.value;
                setSelectZoo(data);
              }}
            />
            {error && error.zipCode ? <p style={{ color: "red" }}>{error.zipCode}</p> : ""}
          </div>

          <div className="mb-30 " style={{ borderBottom: "1px solid #E4E4E4" }}></div>
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
                    const data = { ...selectZoo };
                    data.newImage = true;
                    setSelectedImage(e.target.files[0]);
                    setSelectZoo(data);
                  }}
                />
                <span id="upload-file-name" className="d-flex align-items-center">
                  {selectedImage && selectedImage.name}
                  {(selectZoo && selectZoo.coverImage && selectZoo.coverImage.original) ||
                    (selectedImage && selectedImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectZoo };
                        data.coverImage = {};
                        setSelectZoo(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 626px * 597px</p>
                  )}
                </span>
              </span>
            </div>
            {error && error.image ? <p style={{ color: "red" }}>{error.image}</p> : ""}
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
            {error && error.description ? <p style={{ color: "red" }}>{error.description}</p> : ""}
          </div>
        </div>
      </Offcanvas.Body>

      <div className="offcanvas-footer">
        <NextButton
          label="Save"
          classData={
            selectZoo && selectZoo.regions && selectZoo.regions.length !== 0

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
const mapDispatchToProps = (dispatch) => ({
  getUsCitiesDropdown: (param, callBack) => dispatch(getUsCitiesDropdown(param, callBack)),
});
const mapStateToProps = (state) => ({
  getapisForDropdown: getapisForDropdown(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddZooModal));
