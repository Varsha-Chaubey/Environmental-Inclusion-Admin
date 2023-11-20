import React, { createRef } from "react";

//Components
import Joi from "joi-browser";
import Form from "../common/form/form";
import NextButton from "../common/form/nextButton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../store/signin";
import AlertError from "../common/alerts/alertError";
import { getRedirectUrl, removeKey, setProfile, setToken } from "../utils/localStorageServices";
import LoadingBar from "react-top-loading-bar";

//Images
import logo from "../include/images/EL-logo-white.svg";
import logo1 from "../include/images/member-bg.png";
import logo2 from "../include/images/Login img.png";

class Signin extends Form {
  //states
  ref = createRef(null);

  state = {
    data: { email: "", password: "" },
    errors: {},
    loading: false,
    disabled: false,
    showPwd: false,
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          if (err.type === "string.email") {
            if (err.context.value === "") {
              err.message = "Email is required";
            } else {
              err.message = "Email is invalid.";
            }
          }
          switch (err.type) {
            case "any.empty":
              err.message = "Email is required.";
              break;
            case "string.max":
              err.message = "Email is invalid.";
              break;
          }
        });
        return errors;
      }),
    password: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          if (err.type === "string.regex.name") {
            if (err.context.value === "") {
              err.message = "Password is required.";
            } else {
              err.message = "The password does not meet the password policy requirements.";
            }
          }
          switch (err.type) {
            case "any.empty":
              err.message = "Password is required.";
              break;
            case "string.min":
              err.message = "The password does not meet the password policy requirements.";
              break;
          }
        });
        return errors;
      }),
  };
  componentDidMount = () => {
    document.body.classList.add("p-0");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("p-0");
  };

  doSubmit = () => {
    this.ref.current.continuousStart();
    this.setState({ loading: true, disabled: true });
    const data = { ...this.state.data };
    this.props.signIn(data, this.callBack);
  };

  callBack = (res) => {
    this.setState({ loading: false, disabled: false });
    this.ref.current.complete();
    if (res && res.status === 200) {
      const data = res.data.data;
      const { accessToken, refreshToken } = data;
      setToken(refreshToken, accessToken);
      setProfile(data);
      const redirectUrl = getRedirectUrl();
      if (redirectUrl) {
        removeKey("redirectUrl");
        window.location.assign(`${redirectUrl}`);
      } else {
        this.props.history.push("/");
      }
    } else {
      toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
    }
  };

  render() {
    return (
      <>
        <LoadingBar height={5} color="#47AD1D" ref={this.ref} />
        <div class="flex-member-row d-flex flex-wrap vh-100">
          <div class="flex-member-column w-50 green-bg h-100 position-relative">
            <img class="d-flex-member-logo logo-width" src={logo} alt="" />
            <img class="member-bg w-100 position-absolute" src={logo1} alt="" />
            <img class="member-hero-bg" src={logo2} alt="" />
          </div>
          <div class="flex-member-column w-50 h-100 d-flex flex-column align-items-center justify-content-center">
            <div class="flex-member-form-box">
              <h1 class="text-uppercase">Login</h1>

              {this.renderInput("email", "Email")}

              <div className="form-group">
                {this.renderPasswordInput("password", "Password", "password", "signin")}
                <div className="page-psw-link fw-medium text-end text-capitalize">
                  {/* <a href="#" target="_blank">
                    Forgot password?
                  </a> */}
                </div>
              </div>

              <div className="form-button text-end">
                <NextButton
                  handleSubmit={this.handleSubmit}
                  loading={this.state.loading}
                  disabled={this.state.disabled}
                  label="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signIn: (email, callBack) => dispatch(signIn(email, callBack)),
});

export default withRouter(connect(null, mapDispatchToProps)(Signin));
