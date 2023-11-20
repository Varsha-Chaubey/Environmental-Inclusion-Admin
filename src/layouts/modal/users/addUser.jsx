import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Select from "react-select";
import close from "../../../include/images/close.svg";
import NextButton from "../../../common/form/nextButton";
import { customStyles } from "../../../common/customStyles/reactSelectStyle";
import eyeOff from "../../../include/images/eye-off.svg";
import eye from "../../../include/images/eye.svg";

const AddUser = (props) => {
  const {
    show,
    onHide,
    loading,
    roleOptions,
    userData,
    setUserData,
    addHandler,
    error,
    setError,
    selectedRole,
    setSelectedRole,
    page,
    isActive,
    setIsActive,
    activeOptions,
    editHandler,
    loadingUser,
  } = props;

  const [showEye, setShowEye] = useState(false);

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
        <h5 className="offcanvas-title">{props.page == "Edit" ? "Edit User" : "Add User"}</h5>
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
              First Name
            </label>
            <input
              type="text"
              className="form-control text-in"
              id="firstName"
              value={userData?.firstName}
              onChange={(e) => {
                const data = { ...userData };
                data.firstName = e.target.value;
                setUserData(data);
              }}
            />
            {error && error.firstName ? <p className="error-text">{error.firstName}</p> : ""}
          </div>
          <div className="form-group">
            <label htmlFor="keyword" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control text-in"
              id="lastName"
              value={userData?.lastName}
              onChange={(e) => {
                const data = { ...userData };
                data.lastName = e.target.value;
                setUserData(data);
              }}
            />
            {error && error.lastName ? <p className="error-text">{error.lastName}</p> : ""}
          </div>
          {props.page == "Add" && (
            <div className="form-group">
              <label htmlFor="keyword" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control text-in"
                id="email"
                value={userData?.email}
                onChange={(e) => {
                  const data = { ...userData };
                  data.email = e.target.value.trim();
                  setUserData(data);
                }}
              />
              {error && error.email ? <p className="error-text">{error.email}</p> : ""}
            </div>
          )}
          {page == "Add" && (
            <div className="form-group position-relative">
              <label htmlFor="keyword" className="form-label">
                Password
              </label>
              <input
                type={showEye ? "text" : "password"}
                className="form-control text-in"
                id="keypasswordword"
                value={userData?.password}
                onChange={(e) => {
                  const data = { ...userData };
                  data.password = e.target.value;
                  setUserData(data);
                }}
              />
              <div class={`eye-icon-box ${error?.password && "eye-icon-box-top"}`}>
                <span onClick={() => setShowEye(!showEye)}>
                  <i class={showEye ? "toggle-password toggle" : "toggle-password"} toggle="#password-field">
                    {!showEye ? (
                      <span class="show">
                        <img src={eye} alt="" />
                      </span>
                    ) : (
                      <span class="hide">
                        <img src={eyeOff} alt="" />
                      </span>
                    )}
                  </i>
                </span>
              </div>
              {error && error.password ? <p className="error-text">{error.password}</p> : ""}
            </div>
          )}
          {props.page == "Edit" && (
            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Is Active
              </label>
              <Select
                value={isActive}
                className="basic-single"
                classNamePrefix="select-search"
                placeholder="Select"
                styles={customStyles}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.value}
                options={activeOptions}
                onChange={(e) => setIsActive(e)}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Role
            </label>
            <Select
              value={selectedRole}
              className="basic-single"
              classNamePrefix="select-search"
              placeholder="Select"
              styles={customStyles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              options={roleOptions}
              onChange={(e) => setSelectedRole(e)}
            />
          </div>
        </div>
      </div>
      <div className="offcanvas-footer">
        <NextButton
          label={props.page == "Add" ? "Add User" : "Edit User"}
          classData="btn btn-default btn-block"
          handleSubmit={() => (props.page == "Add" ? addHandler() : editHandler())}
          loading={loadingUser}
        />
      </div>
    </Offcanvas>
  );
};

export default AddUser;
