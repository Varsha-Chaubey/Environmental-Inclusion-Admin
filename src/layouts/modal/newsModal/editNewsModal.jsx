import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import NextButton from "../../../common/form/nextButton";
import Editor from "../../../common/editor/editor";
const EditNewsModal = (props) => {
  const {
    show,
    onHide,
    loading,
    error,
    regionsDropdownData,
    speciesDropdownData,
    organizationsDropdownData,
    newsCategoryDropdownData,
    zooDropdownData,
    setSelectNews,
    selectNews,
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
        <h5 className="offcanvas-title">Edit a News</h5>
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
              value={selectNews && selectNews.name ? selectNews.name : ""}
              type="text"
              className="form-control w-100  text-in "
              onChange={(e) => {
                const data = { ...selectNews };
                data.name = e.target.value;
                setSelectNews(data);
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
                selectNews &&
                selectNews.regions &&
                selectNews.regions.length > 0 &&
                selectNews.regions.map((item) =>
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
              name={regionsDropdownData && regionsDropdownData.name}
              onChange={(event) => {
                const data = { ...selectNews };

                data.regions = event;
                setSelectNews({ ...data });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Category
            </label>
            <Select
              value={
                selectNews && selectNews?.categories
                  ? selectNews?.categories?.map((item) => ({
                      name: item?.name ? item?.name[0].toUpperCase() + item?.name.slice(1).toLowerCase() : "",
                      _id: item?._id,
                    }))
                  : []
              }
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              isMulti
              options={newsCategoryDropdownData}
              name={newsCategoryDropdownData && newsCategoryDropdownData.name}
              onChange={(e) => {
                const data = { ...selectNews };
                data.categories = e;

                setSelectNews(data);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Species
            </label>
            <Select
              value={selectNews && selectNews.species ? selectNews.species : ""}
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
                const data = { ...selectNews };
                data.species = event;
                setSelectNews({ ...data });
              }}
            />
          </div>

          <div className="form-group ">
            <label htmlFor="type" className="form-label">
              Organizations
            </label>
            <Select
              value={selectNews && selectNews.organizations ? selectNews.organizations : ""}
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
                const data = { ...selectNews };
                data.organizations = event;
                setSelectNews({ ...data });
              }}
            />
          </div>

          <div className="form-group mb-30">
            <label htmlFor="type" className="form-label">
              Zoos and Wildlife Reserve
            </label>
            <Select
              value={selectNews && selectNews.zoos ? selectNews.zoos : ""}
              className="basic-single"
              classNamePrefix="select-search"
              isMulti
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={zooDropdownData}
              name={zooDropdownData && zooDropdownData.name}
              onChange={(event) => {
                const data = { ...selectNews };
                data.zoos = event;
                setSelectNews({ ...data });
              }}
            />
          </div>

          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Author
            </label>
            <input
              value={selectNews && selectNews.author ? selectNews.author : ""}
              type="text"
              className="form-control w-100  text-in "
              onChange={(e) => {
                const data = { ...selectNews };
                data.author = e.target.value;
                setSelectNews(data);
              }}
            />
            {error && error.author ? <p style={{ color: "red" }}>{error.author}</p> : ""}
          </div>
          <div className="mb-30">
            <label htmlFor="regionDescription" className="form-label">
              Source Url
            </label>
            <input
              type="text"
              className="form-control w-100  text-in"
              value={selectNews?.sourceUrl}
              onChange={(e) => {
                const data = { ...selectNews };
                data.sourceUrl = e.target.value;
                setSelectNews(data);
              }}
            />
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
            selectNews && selectNews.regions && selectNews.regions.length !== 0
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

export default EditNewsModal;
