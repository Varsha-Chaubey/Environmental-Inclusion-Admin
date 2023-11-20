import React, { Component } from "react";

class EditSelect extends Component {
  render() {
    const { name, label, options, error, ...rest } = this.props;
    return (
      <div className="form-group not-empty">
        <label htmlFor={name}>{label}</label>
        <select
          {...rest}
          name={name}
          id={name}
          className={error ? "form-control is-invalid" : "form-control"}
        >
          <option key="x" value="" disabled />
          {options.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}

export default EditSelect;
