import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
const AddSpeciesCategoryModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    selectSpeciesCat,
    setSelectSpeciesCat,
    selectedImage,
    setSelectedImage,
    handleSubmit,
  } = props;

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
        <h5 className="offcanvas-title">Add a Species Category </h5>
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
            <label htmlFor="speciesCategory" className="form-label">
              Species Category
            </label>
            <input
              type="text"
              className="form-control text-in"
              id="name"
              onChange={(e) => {
                const data = { ...selectSpeciesCat };
                data.name = e.target.value;
                setSelectSpeciesCat(data);
              }}
            />
            {error && error.name ? (
              <p style={{ color: "red" }}>{error.name}</p>
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
                    const data = { ...selectSpeciesCat };
                    data.newImage = true;
                    setSelectedImage(e.target.files[0]);
                    setSelectSpeciesCat(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {selectedImage && selectedImage.name}
                  {(selectSpeciesCat &&
                    selectSpeciesCat.coverImage &&
                    selectSpeciesCat.coverImage.original) ||
                    (selectedImage && selectedImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectSpeciesCat };
                        data.coverImage = {};
                        setSelectSpeciesCat(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Browse</p>
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

          <div className="form-group">
            <label htmlFor="extinctionPercentage" className="form-label">
              Extinction Percentage
            </label>
            <input
              type="number"
              className="form-control text-in"
              id="name"
              onChange={(e) => {
                const data = { ...selectSpeciesCat };
                data.extinctionPercentage = e.target.value;
                setSelectSpeciesCat(data);
              }}
            />
            {error && error.extinctionPercentage ? (
              <p style={{ color: "red" }}>{error.extinctionPercentage}</p>
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

export default AddSpeciesCategoryModal;
