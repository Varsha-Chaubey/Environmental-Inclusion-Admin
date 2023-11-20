import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import eyeOff from "./../../include/images/eye-off.svg";
import eye from "./../../include/images/eye.svg";
import helpIcon from "./../../include/images/help-circle.svg";
import errorIcon from "./../../include/images/Info-icon.svg";

class Password extends Component {
  state = {
    isPasswordShown: false,
    formclass: "form-group custom-input",
    tooltip: false,
  };

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.error !== prevProps.error) {
      ReactTooltip.rebuild();
    }
  };
  handleFocus = () => {
    this.setState({ formclass: "form-group custom-input show on" });
  };

  handleBlur = (e) => {
    const classname = e.target.value
      ? "form-group custom-input show on"
      : "form-group custom-input";
    this.setState({ formclass: classname });
  };

  toggleShowPassword = (e) => {
    this.setState({ isPasswordShown: !this.state.isPasswordShown });
    this.input.current.type = this.state.isPasswordShown ? "password" : "text";
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      const classname = this.props.value
        ? "form-group custom-input show on"
        : "form-group custom-input";
      this.setState({ formclass: classname });
    }
  }

  render() {
    const { name, label, page, error, errorId, id, ...rest } = this.props;
    return (
      <>
        <ReactTooltip
          style={{
            boxShadow: "0px 5px 30px rgb(0 0 0 / 10%)",
            borderRadius: "4px",
          }}
          backgroundColor={"white"}
          textColor={"black"}
          border={true}
          borderColor="grey"
          id="pass-err"
          html={true}
        />

        <label for="password" class="form-label">
          Password
        </label>
        <div class="input-group">
          <input
            name={name}
            id={name}
            className={error ? "form-control error" : "form-control"}
            type="password"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={this.input}
            {...rest}
          />
          <div class={`eye-icon-box ${error && "eye-icon-box-top"}`}>
            <span
              onClick={this.toggleShowPassword}
              style={{ margin: "0 10px" }}
            >
              <i
                class={
                  this.state.isPasswordShown
                    ? "toggle-password toggle"
                    : "toggle-password"
                }
                toggle="#password-field"
              >
                {!this.state.isPasswordShown ? (
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
          {error && (
            <span className="tooltip-signin-error">
              <i
                class="toggle-password"
                toggle="#password-field"
                data-tip={error}
                data-for="pass-err"
              >
                <span class="show">
                  <img src={errorIcon} alt="" />
                </span>
              </i>
            </span>
          )}
        </div>
      </>
    );
  }
}

export default Password;
