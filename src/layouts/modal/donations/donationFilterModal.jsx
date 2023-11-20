import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import NextButton from "../../../common/form/nextButton";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
const DonationFilterModal = (props) => {
  const {
    show,
    onHide,
    speciesDropdownData,
    handleFilter,
    filterState,
    loading,
    setFilterState,
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
              className="form-control  text-in"
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
              Species
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={speciesDropdownData}
              onChange={(event) => {
                const data = { ...filterState };
                data.species = event;
                setFilterState(data);
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

export default DonationFilterModal;
