import React, { useEffect, useRef, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import AlertError from "../../../common/alerts/alertError";
import { connect } from "react-redux";
import {
  getapisForDropdown,
  getUsCitiesDropdown,
} from "../../../store/apisForDropdown";
import { toast } from "react-toastify";
import Editor from "../../../common/editor/editor";
const AddOrganizationModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    regionsDropdownData,
    speciesDropdownData,
    setSelectOrganization,
    selectOrganization,
    selectedImage,
    setSelectedImage,
    handleSubmit,
    selectOrganizationLocation,
    setSelectOrganizationLocation,
    setLoadingOrganization,
    countriesDropdownData,
    usStateDropdownData,
    selectedDetailTabImage,
    setSelectedDetailTabImage,
    selectedBannerImage,
    setSelectedBannerImage,
    editorLoaded,
    setEditorLoaded,
    editorData,
    setEditorData,
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

  var ref = useRef(null);
  const [usCitiesDropdownData, setUsCitiesDropdownData] = useState(null);
  const [stateId, setStateId] = useState();

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingOrganization(true);

    const payload = {
      id: stateId,
    };
    props.getUsCitiesDropdown(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingOrganization(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, [stateId]);

  const cities =
    props.getapisForDropdown &&
    props.getapisForDropdown.usCitiesItems &&
    props.getapisForDropdown.usCitiesItems.data;

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
        <h5 className="offcanvas-title">Add an Organization</h5>
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
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.name = e.target.value;
                setSelectOrganization(data);
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
                const data = { ...selectOrganization };
                data.regions = event;
                setSelectOrganization({ ...data });
              }}
            />
          </div>

          <div className="form-group mb-30">
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
                const data = { ...selectOrganization };
                data.species = event;
                setSelectOrganization({ ...data });
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
                    const data = { ...selectOrganization };
                    data.newImage = true;
                    setSelectedImage(e.target.files[0]);
                    setSelectOrganization(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedImage && selectedImage.name}
                  {(selectOrganization &&
                    selectOrganization.coverImage &&
                    selectOrganization.coverImage.original) ||
                  (selectedImage && selectedImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectOrganization };
                        data.coverImage = {};
                        setSelectOrganization(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 248px * 201px</p>
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
              Banner Image
            </label>
            <div className="upload-lg-button position-relative">
              <span className="file-input">
                <input
                  class="form-control position-absolute"
                  id="inputGroupFile02"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) => {
                    const data = { ...selectOrganization };
                    data.newBannerImage = true;
                    setSelectedBannerImage(e.target.files[0]);
                    setSelectOrganization(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedBannerImage && selectedBannerImage.name}
                  {(selectOrganization &&
                    selectOrganization.bannerImage &&
                    selectOrganization.bannerImage.original) ||
                  (selectedBannerImage && selectedBannerImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectOrganization };
                        data.bannerImage = {};
                        setSelectOrganization(data);
                        setSelectedBannerImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 1440px * 317px</p>
                  )}
                </span>
              </span>
            </div>
            {error && error.BannerImage ? (
              <p style={{ color: "red" }}>{error.BannerImage}</p>
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
                    const data = { ...selectOrganization };
                    data.newDetailImage = true;
                    setSelectedDetailTabImage(e.target.files[0]);
                    setSelectOrganization(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedDetailTabImage && selectedDetailTabImage.name}
                  {(selectOrganization &&
                    selectOrganization.detailTabImage &&
                    selectOrganization.detailTabImage.original) ||
                  (selectedDetailTabImage && selectedDetailTabImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectOrganization };
                        data.detailTabImage = {};
                        setSelectOrganization(data);
                        setSelectedDetailTabImage(null);
                      }}
                    />
                  ) : (
                    <p>Image should be 583px * 451px</p>
                  )}
                </span>
              </span>
            </div>
            {error && error.DetailImage ? (
              <p style={{ color: "red" }}>{error.DetailImage}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Years of Working
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.yearsOfWorking = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.yearsOfWorking ? (
              <p style={{ color: "red" }}>{error.yearsOfWorking}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Animal Lives Saved
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.animalLivesSaved = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.animalLivesSaved ? (
              <p style={{ color: "red" }}>{error.animalLivesSaved}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Area of Habitat Covered
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.areaOfHabitatCovered = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.areaOfHabitatCovered ? (
              <p style={{ color: "red" }}>{error.areaOfHabitatCovered}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Amount Invested
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.amountInvested = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.amountInvested ? (
              <p style={{ color: "red" }}>{error.amountInvested}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Animals Receiving Care
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.animalReceivingCare = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.animalReceivingCare ? (
              <p style={{ color: "red" }}>{error.animalReceivingCare}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Helping Hands
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.helpingHands = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.helpingHands ? (
              <p style={{ color: "red" }}>{error.helpingHands}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Website URL
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.websiteUrl = e.target.value;
                setSelectOrganization(data);
              }}
            />
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Donation URL
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.donationUrl = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.donationUrl ? (
              <p style={{ color: "red" }}>{error.donationUrl}</p>
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
            <label htmlFor="regionDescription" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control w-100 text-in "
              onChange={(e) => {
                const data = { ...selectOrganization };
                data.address = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.address ? (
              <p style={{ color: "red" }}>{error.address}</p>
            ) : (
              ""
            )}
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
                let data = { ...selectOrganizationLocation };
                data.countryName = event.name;
                data.country = event.code;
                data.countryID = event.id;
                setSelectOrganizationLocation(data);
              }}
            />
          </div>

          {(selectOrganizationLocation &&
            selectOrganizationLocation?.country &&
            selectOrganizationLocation?.country === "US") ||
          (selectOrganizationLocation &&
            selectOrganizationLocation?.countryName &&
            selectOrganizationLocation?.countryName === "United States") ? (
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
                    const data = { ...selectOrganizationLocation };
                    data.stateName = event.name;
                    data.stateID = event.id;
                    setStateId(event.id);
                    setSelectOrganizationLocation(data);
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
                  const data = { ...selectOrganizationLocation };
                  data.stateName = e.target.value;
                  setSelectOrganizationLocation(data);
                }}
              />
              {error && error.stateName ? (
                <p style={{ color: "red" }}>{error.stateName}</p>
              ) : (
                ""
              )}
            </div>
          )}

          {(selectOrganizationLocation &&
            selectOrganizationLocation?.country &&
            selectOrganizationLocation?.country === "US") ||
          (selectOrganizationLocation &&
            selectOrganizationLocation?.countryName &&
            selectOrganizationLocation?.countryName === "United States") ||
          stateId ? (
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
                    const data = { ...selectOrganizationLocation };
                    data.cityName = event.name;
                    data.cityID = event.id;
                    setSelectOrganizationLocation(data);
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
                  const data = { ...selectOrganizationLocation };
                  data.cityName = e.target.value;
                  setSelectOrganizationLocation(data);
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
                const data = { ...selectOrganization };
                data.zipCode = e.target.value;
                setSelectOrganization(data);
              }}
            />
            {error && error.zipCode ? (
              <p style={{ color: "red" }}>{error.zipCode}</p>
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

          <div className="mb-30 d-flex justify-content-between ">
            <label htmlFor="regionDescription " className="form-label">
              Add To Donation List
            </label>
            <input
              type="checkbox"
              className="checkmark form-check-input"
              style={{
                width: "30px",
                height: "30px",
                background: "20px solid #e4e4e4",
              }}
              checked={props.isCheck}
              onChange={(e) => {
                const data = { ...selectOrganization };
                props.setIsCheck(!props.isCheck);
                data.isAddedToDonation = e.target.checked;
                setSelectOrganization(data);
              }}
            />
          </div>
        </div>
      </Offcanvas.Body>

      <div className="offcanvas-footer">
        <NextButton
          label="Save"
          classData={
            selectOrganization &&
            selectOrganization.regions &&
            selectOrganization.regions.length !== 0
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
  getUsCitiesDropdown: (param, callBack) =>
    dispatch(getUsCitiesDropdown(param, callBack)),
});
const mapStateToProps = (state) => ({
  getapisForDropdown: getapisForDropdown(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddOrganizationModal));
