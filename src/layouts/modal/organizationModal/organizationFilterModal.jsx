import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import NextButton from "../../../common/form/nextButton";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
const OrganizationFilterModal = (props) => {
  const { show, onHide, regionsDropdownData, speciesDropdownData, handleFilter, filterState, setFilterState, loading } =
    props;

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
      id="filter"
      enforceFocus={false}
    >
      <div className="offcanvas-header filter-margin">
        <h5 className="offcanvas-title">Filters</h5>
        <button
          type="button"
          className="offcanvas-close-btn d-flex align-items-center justify-content-center"
          onClick={() => onHide()}
        >
          <img src={close} alt="" />
        </button>
      </div>
      <div className="offcanvas-body p-0">
        <div className="offcanvas-widget-row pt-0 filter-margin">
          <div className="form-group">
            <label htmlFor="keyword" className="form-label">
              Keyword
            </label>
            <input
              type="text"
              className="form-control text-in"
              name="keyword"
              value={filterState && filterState.keyword}
              onChange={(e) => {
                const data = { ...filterState };
                data.keyword = e.target.value;
                setFilterState(data);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Regions
            </label>
            <Select
              value={filterState && filterState.regions}
              isMulti
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.state}
              getOptionValue={(option) => option._id}
              options={regionsDropdownData}
              name={regionsDropdownData && regionsDropdownData.state}
              onChange={(event) => {
                const data = { ...filterState };
                data.regions = event;
                setFilterState({ ...data });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Species
            </label>
            <Select
              value={filterState && filterState.species}
              isMulti
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={speciesDropdownData}
              name={speciesDropdownData && speciesDropdownData.name}
              onChange={(event) => {
                const data = { ...filterState };
                data.species = event;
                setFilterState({ ...data });
              }}
            />
          </div>
        </div>
      </div>
      <div className="offcanvas-footer">
        <NextButton
          label="Apply Filter"
          classData="btn btn-default btn-block"
          handleSubmit={() => handleFilter()}
          loading={loading}
        />
      </div>
    </Offcanvas>
  );
};

export default OrganizationFilterModal;
