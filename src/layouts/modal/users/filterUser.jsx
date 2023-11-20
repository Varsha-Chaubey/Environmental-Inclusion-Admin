import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import NextButton from "../../../common/form/nextButton";
import close from "../../../include/images/close.svg";

const FilterUser = ({ error, ...props }) => {
  return (
    <Offcanvas
      placement="end"
      backdropclassName="upload-documnets-backdrop"
      show={props.show}
      onHide={() => props.onHide()}
      className="offcanvas offcanvas-end border-0"
      id="filter"
      enforceFocus={false}
    >
      <div className="offcanvas-header filter-margin">
        <h5 className="offcanvas-title">Filter User</h5>
        <button
          type="button"
          className="offcanvas-close-btn d-flex align-items-center justify-content-center"
          onClick={() => props.onHide()}
        >
          <img src={close} alt="" />
        </button>
      </div>
      <div className="offcanvas-body p-0">
        <div className="offcanvas-widget-row pt-0 filter-margin">
          <div className="form-group position-relative">
            <label htmlFor="name-search" className="form-label">
              Name
            </label>
            <input
              type={"text"}
              className="form-control text-in"
              id="name-search"
              value={props.search?.name == "name" ? props.search?.value : ""}
              disabled={props.search && props.search.name == "email" && props.search?.value?.length > 0 ? true : false}
              onChange={(e) => {
                const data = { ...props.search };
                data.name = "name";
                data.value = e.target.value;
                props.setSearch(data);
              }}
            />

            {error && error.name ? <p className="error-text">{error.name}</p> : ""}
          </div>
          <div className="form-group position-relative">
            <label htmlFor="email-search" className="form-label">
              Email
            </label>
            <input
              type={"text"}
              className="form-control text-in"
              id="email-search"
              disabled={props.search && props.search.name == "name" && props.search?.value?.length > 0 ? true : false}
              value={props.search?.name == "email" ? props.search?.value : ""}
              onChange={(e) => {
                const data = { ...props.search };
                data.name = "email";
                data.value = e.target.value;
                props.setSearch(data);
              }}
            />

            {error && error.emailSearch ? <p className="error-text">{error.emailSearch}</p> : ""}
          </div>
        </div>
      </div>
      <div className="offcanvas-footer">
        <NextButton
          label="Filter User"
          classData={`btn btn-default btn-block ${!props.search?.value ? "disabled" : ""}`}
          handleSubmit={() => props.filterHandler()}
          loading={props.loading}
        />
      </div>
    </Offcanvas>
  );
};

export default FilterUser;
