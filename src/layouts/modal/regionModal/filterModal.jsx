import React from "react";
import { Offcanvas } from "react-bootstrap";
import Select from "react-select";
import close from "../../../include/images/close.svg";
import NextButton from "../../../common/form/nextButton";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
const FilterModal = (props) => {
  const {
    show,
    onHide,
    filterKeyword,
    filterCountry,
    setFilterKeyword,
    countryDropDown,
    setFilterCountry,
    handleFilter,
    loading,
  } = props;

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
        <button type="button"
          className="offcanvas-close-btn d-flex align-items-center justify-content-center"
          onClick={() => onHide()}>
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
              id="keyword"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Country
            </label>
            <Select
              value={filterCountry}
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.code}
              options={countryDropDown}
              name={filterCountry && filterCountry.name}
              onChange={(event) => {
                setFilterCountry(event);
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

export default FilterModal;
