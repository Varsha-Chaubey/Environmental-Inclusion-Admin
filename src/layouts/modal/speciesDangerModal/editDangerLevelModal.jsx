import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
const EditDangerModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    selectDangerData,
    setSelectedDangerData,
    selectedImage,
    setSelectedImage,
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
        <h5 className="offcanvas-title">Edit a Danger Level </h5>
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
              Danger Level
            </label>
            <input
              value={selectDangerData ? selectDangerData.name : ""}
              type="text"
              className="form-control text-in"
              id="name"
              onChange={(e) => {
                const data = { ...selectDangerData };
                data.name = e.target.value;
                setSelectedDangerData(data);
              }}
            />
            {error && error.name ? <p style={{ color: "red" }}>{error.name}</p> : ""}
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
                    const data = { ...selectDangerData };
                    data.newImage = true;
                    data.coverImage = {};
                    setSelectedImage(e.target.files[0]);
                    setSelectedDangerData(data);
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setImgSrc(reader.result);
                    };
                  }}
                />
                <span id="upload-file-name" className="d-flex align-items-center">
                  {selectDangerData && selectDangerData.newImage && selectedImage
                    ? selectedImage.name.length > 40
                      ? selectedImage.name.substring(0, 40) + "..."
                      : selectedImage.name
                    : selectDangerData && selectDangerData.coverImage && selectDangerData.coverImage.original
                      ? selectDangerData.coverImage.original.length > 40
                        ? selectDangerData.coverImage.original.substring(0, 40) + "..."
                        : selectDangerData.coverImage.original
                      : ""}

                  {(selectDangerData && selectDangerData.coverImage && selectDangerData.coverImage.original) ||
                    selectedImage ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectDangerData };
                        data.coverImage = {};
                        data.newImage = false;
                        setSelectedDangerData(data);
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
          {selectDangerData && selectDangerData.coverImage ? (
            <>
              {selectDangerData && selectDangerData.coverImage && selectDangerData.coverImage.original ? (
                <div className="td-img-dev mt-3 mb-3">
                  <img
                    src={
                      process.env.REACT_APP_MEDIA +
                      `${selectDangerData && selectDangerData.coverImage && selectDangerData.coverImage.small}`
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

export default EditDangerModal;
