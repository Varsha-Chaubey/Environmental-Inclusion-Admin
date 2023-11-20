import React, { Component } from "react";

class EditInput extends Component {
  render() {
    const { name, label, error, ...rest } = this.props;
    return (
      <div className="form-group not-empty">
        <label htmlFor={name}>{label}</label>
        <input
          {...rest}
          name={name}
          id={name}
          className="form-control is-invalid"
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}

export default EditInput;
