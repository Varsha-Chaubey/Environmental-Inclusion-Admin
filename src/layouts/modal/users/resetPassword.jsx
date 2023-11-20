import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import NextButton from "../../../common/form/nextButton";
import close from "../../../include/images/close.svg";
import eyeOff from "../../../include/images/eye-off.svg";
import eye from "../../../include/images/eye.svg";
import _ from "lodash";

const ResetPassword = ({ error, ...props }) => {
  const [showEye, setShowEye] = useState(false);
  const [showEye1, setShowEye1] = useState(false);

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
        <h5 className="offcanvas-title">Reset Password</h5>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={showEye ? "text" : "password"}
              className="form-control text-in"
              id="firstName"
              value={props.pwd?.password}
              onChange={(e) => {
                const data = { ...props.pwd };
                data.password = e.target.value;
                props.setPwd(data);
              }}
            />
            <div class={`eye-icon-box ${!_.isEmpty(error) && "eye-icon-box-top"}`}>
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
          <div className="form-group position-relative">
            <label htmlFor="password1" className="form-label">
              New Password
            </label>
            <input
              type={showEye1 ? "text" : "password"}
              className="form-control text-in"
              id="lastName"
              value={props.pwd?.password1}
              onChange={(e) => {
                const data = { ...props.pwd };
                data.password1 = e.target.value;
                props.setPwd(data);
              }}
            />
            <div class={`eye-icon-box ${!_.isEmpty(error) && "eye-icon-box-top"}`}>
              <span onClick={() => setShowEye1(!showEye1)}>
                <i class={showEye1 ? "toggle-password toggle" : "toggle-password"} toggle="#password-field">
                  {!showEye1 ? (
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
            {error && error.password1 ? <p className="error-text">{error.password1}</p> : ""}
          </div>
        </div>
      </div>
      <div className="offcanvas-footer">
        <NextButton
          label="Reset Password"
          classData="btn btn-default btn-block"
          handleSubmit={() => props.pwdHandler()}
          loading={props.loading}
        />
      </div>
    </Offcanvas>
  );
};

export default ResetPassword;
