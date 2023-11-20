import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
const EditOurPartnerModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    selectOurPartner,
    setSelectOurPartner,
    selectedImage,
    setSelectedImage,
    organizationsDropdown,
    handleSubmit,
  } = props;
  const [imgSrc, setImgSrc] = useState(null);
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
        <h5 className="offcanvas-title">Edit a Partner</h5>
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
              Name of Partner
            </label>
            <input
              type="text"
              value={selectOurPartner?.name}
              className="form-control text-in"
              id="name"
              onChange={(e) => {
                const data = { ...selectOurPartner };
                data.name = e.target.value;
                setSelectOurPartner(data);
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
              value={{
                name: selectOurPartner?.organization?.name,
                value: selectOurPartner?.organization?._id,
              }}
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={organizationsDropdown}
              name={organizationsDropdown && organizationsDropdown.name}
              onChange={(event) => {
                const data = { ...selectOurPartner };
                data.organization = event;
                setSelectOurPartner(data);
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
              Logo of Partner
            </label>
            <div className="upload-lg-button position-relative">
              <span className="file-input">
                <input
                  class="form-control position-absolute"
                  id="inputGroupFile02"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) => {
                    const data = { ...selectOurPartner };
                    data.newImage = true;
                    data.logo = {};
                    setSelectedImage(e.target.files[0]);
                    setSelectOurPartner(data);
                    const file = e.target.files[0];
                    const reader = new FileReader();
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
                  {selectOurPartner &&
                  selectOurPartner.newImage &&
                  selectedImage
                    ? selectedImage.name.length > 40
                      ? selectedImage.name.substring(0, 40) + "..."
                      : selectedImage.name
                    : selectOurPartner &&
                      selectOurPartner.logo &&
                      selectOurPartner.logo.original
                    ? selectOurPartner.logo.original.length > 40
                      ? selectOurPartner.logo.original.substring(0, 40) + "..."
                      : selectOurPartner.logo.original
                    : ""}

                  {(selectOurPartner &&
                    selectOurPartner.logo &&
                    selectOurPartner.logo.original) ||
                  selectedImage ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectOurPartner };
                        data.logo = {};
                        data.newImage = false;
                        setSelectOurPartner(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Browse</p>
                  )}
                </span>
              </span>
            </div>
          </div>
          {selectOurPartner && selectOurPartner.logo ? (
            <>
              {selectOurPartner &&
              selectOurPartner.logo &&
              selectOurPartner.logo.original ? (
                <div className="td-img-dev mt-3 mb-3">
                  <img
                    src={
                      process.env.REACT_APP_MEDIA +
                      `${
                        selectOurPartner &&
                        selectOurPartner.logo &&
                        selectOurPartner.logo.small
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

export default EditOurPartnerModal;
