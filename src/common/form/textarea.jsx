import React, { Component } from "react";

class Textarea extends Component {
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
    const { name, label, error, placeholder, ...rest } = this.props;
    return (
      <div className={this.state.formclass}>
        {label && <label htmlFor={name}>{label}</label>}
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          className={error ? "form-control error" : "form-control"}
          multiline
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...rest}
        />
      </div>
    );
  }
}

export default Textarea;
