import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import crossIcon from "../../../include/images/cross-icon.svg";
import Editor from "../../../common/editor/editor";
const AddBlogModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    regionsDropdownData,
    speciesDropdownData,
    organizationsDropdownData,
    blogCategoryDropdownData,
    selectBlog,
    setSelectBlog,
    selectedImage,
    setSelectedImage,
    handleSubmit,
    editorLoaded,
    setEditorLoaded,
    setEditorData,
    editorData,
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
        <h5 className="offcanvas-title">Add a Blog</h5>
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
              className="form-control w-100  text-in "
              onChange={(e) => {
                const data = { ...selectBlog };
                data.name = e.target.value;
                setSelectBlog(data);
              }}
            />
            {error && error.name ? <p style={{ color: "red" }}>{error.name}</p> : ""}
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Blog Category
            </label>
            <Select
              value={
                selectBlog && selectBlog?.categories
                  ? selectBlog?.selectBlog?.map((item) => ({
                      name: item?.name ? item?.name : "",
                      _id: item?._id,
                    }))
                  : []
              }
              isMulti
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={blogCategoryDropdownData}
              name={blogCategoryDropdownData && blogCategoryDropdownData.name}
              onChange={(e) => {
                const data = { ...selectBlog };
                data.categories = e;

                setSelectBlog(data);
              }}
            />
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
                const data = { ...selectBlog };
                data.regions = event;
                setSelectBlog({ ...data });
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
                const data = { ...selectBlog };
                data.species = event;
                setSelectBlog({ ...data });
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
                const data = { ...selectBlog };
                data.organizations = event;
                setSelectBlog({ ...data });
              }}
            />
          </div>
          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control w-100  text-in"
              onChange={(e) => {
                const data = { ...selectBlog };
                data.author = e.target.value;
                setSelectBlog(data);
              }}
            />
            {error && error.author ? <p style={{ color: "red" }}>{error.author}</p> : ""}
          </div>
          <div className="mb-30">
            <label htmlFor="selectImage" className="form-label">
              Image
            </label>
            <div className="upload-lg-button position-relative">
              <span className="file-input">
                <input
                  class="form-control  position-absolute"
                  id="inputGroupFile02"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) => {
                    const data = { ...selectBlog };
                    data.newImage = true;
                    setSelectedImage(e.target.files[0]);
                    setSelectBlog(data);
                  }}
                />
                <span id="upload-file-name" className="d-flex align-items-center">
                  {selectedImage && selectedImage.name}
                  {(selectBlog && selectBlog.coverImage && selectBlog.coverImage.original) ||
                  (selectedImage && selectedImage.name) ? (
                    <img
                      class="cross-icon-box"
                      src={crossIcon}
                      alt=""
                      onClick={() => {
                        const data = { ...selectBlog };
                        data.coverImage = {};
                        setSelectBlog(data);
                        setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Browse</p>
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
                className="ck-content des-height "
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
            selectBlog && selectBlog.categories?.length > 0
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

export default AddBlogModal;
