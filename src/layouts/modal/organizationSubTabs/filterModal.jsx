import React from "react";
import { Offcanvas } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import Select from "react-select";
import NextButton from "../../../common/form/nextButton";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
const FilterModal = (props) => {
  const {
    show,
    onHide,
    handleFilter,
    filterState,
    setFilterState,
    organizationsDropdown,
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
          {props.page ==="Add Media"?(
            <div className="form-group">
            <label htmlFor="type" className="form-label">
              Organisation
            </label>
            <Select
              value={{
                name: filterState?.organization?.name,
                value: filterState?.organization?._id,
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
                const data = { ...filterState };
                data.organization = event;
                setFilterState(data);
              }}
            />
          </div>
          ):(
<>
<div className="form-group">
            <label htmlFor="keyword" className="form-label">
              Keyword
            </label>
            <input
              type="text"
              className="form-control text-in"
              id="keyword"
              value={filterState?.keyword}
              onChange={(e) => {
                const data = { ...filterState };
                data.keyword = e.target.value;
                setFilterState(data);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Organisation
            </label>
            <Select
              value={{
                name: filterState?.organization?.name,
                value: filterState?.organization?._id,
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
                const data = { ...filterState };
                data.organization = event;
                setFilterState(data);
              }}
            />
          </div>
</>
          )}
          
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
