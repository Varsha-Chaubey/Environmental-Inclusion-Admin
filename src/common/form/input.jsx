import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import helpIcon from "./../../include/images/help-circle.svg";
import errorIcon from "./../../include/images/Info-icon.svg";

class Input extends Component {
  state = {
    formclass: "form-group custom-input",
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

  componentDidMount() {
    const classname = this.props.value
      ? "form-group custom-input show on"
      : "form-group custom-input";
    this.setState({ formclass: classname });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      const classname = this.props.value
        ? "form-group custom-input show on"
        : "form-group custom-input";
      this.setState({ formclass: classname });
    }
  }
  render() {
    const { name, label, error, readOnly, toolData, ...rest } = this.props;
    return (
      <>
        <div className="form-group">
          {error && (
            <ReactTooltip
              backgroundColor={"white"}
              textColor={"black"}
              border={true}
              borderColor="grey"
              id={`${name}-err`}
            />
          )}
          {label && (
            <label htmlFor={name}>
              {label}{" "}
              {toolData && (
                <span class="custom-tooltip" data-title={toolData}>
                  <img src={helpIcon} />
                </span>
              )}
            </label>
          )}
          <div className="input-group">
            <input
              name={name}
              id={name}
              className={error ? "form-control error" : "form-control"}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              readOnly={readOnly}
              {...rest}
            />
            {error && (
              <>
                <span className="tooltip-signin-error">
                  <i
                    class="toggle-password"
                    toggle="#password-field"
                    data-tip={error}
                    data-for={`${name}-err`}
                  >
                    <span class="show">
                      <img src={errorIcon} alt="" />
                    </span>
                  </i>
                </span>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Input;
