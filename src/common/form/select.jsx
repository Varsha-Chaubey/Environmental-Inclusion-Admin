import React, { Component } from "react";

class Select extends Component {
  state = {
    formclass: "form-group custom-input show on",
  };

  handleFocus = () => {
    this.setState({ formclass: "form-group custom-input show on" });
  };

  handleBlur = (e) => {
    const classname = e.target.value
      ? "form-group custom-input show on"
      : "form-group custom-input show on";
    this.setState({ formclass: classname });
  };

  componentDidMount() {
    const classname = this.props.defaultValue
      ? "form-group custom-input show on"
      : "form-group custom-input show on";
    this.setState({ formclass: classname });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      const classname = this.props.value
        ? "form-group custom-input show on"
        : "form-group custom-input show on";
      this.setState({ formclass: classname });
    }
  }

  render() {
    const {
      name,
      label,
      options,
      error,
      defaultValue,
      value,
      readOnly,
      ...rest
    } = this.props;
    return (
      <div className={this.state.formclass + " " + name}>
        <label htmlFor={name}>{label}</label>

        <select
          {...rest}
          name={name}
          id={name}
          value={value}
          defaultValue={defaultValue}
          className={error ? "form-control error" : "form-control"}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          readOnly={readOnly}
        >
          <option key="x" value="">
            {label}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option._id ? option._id : option.id}
              //selected={option._id === value}
            >
              {option.name}
              {typeof option.size === "number" && ` (${option.size})`}
            </option>
          ))}
        </select>

        {error && <label className="error">{error}</label>}
      </div>
    );
  }
}

export default Select;
