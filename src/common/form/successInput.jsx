import React, { Component } from "react";

class SuccessInput extends Component {
  state = {
    formclass: "form-group",
  };

  handleFocus = () => {
    this.setState({ formclass: "form-group not-empty" });
  };

  handleBlur = (e) => {
    const classname = e.target.value ? "form-group not-empty" : "form-group";
    this.setState({ formclass: classname });
  };
  render() {
    const { name, label, error, ...rest } = this.props;
    return (
      <div className={this.state.formclass}>
        <label htmlFor={name}>{label}</label>
        <input
          {...rest}
          name={name}
          id={name}
          className="form-control is-valid"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}

export default SuccessInput;
