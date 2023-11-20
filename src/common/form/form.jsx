import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectUpdate from "./selectUpdate";
import Password from "./password";
import SuccessInput from "./successInput";
import EditInput from "./editInput";
import EditSelect from "./editSelect";
import Select from "./select";
import Textarea from "./textarea";
import Query from "./query";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema, { abortEarly: false });
    return error ? error.details[0].message : null;
  };

  setErrors = (input) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    if (input.name === "confirmPassword") {
      if (this.state.data.password === input.value) {
        delete errors[input.name];
      }
    }
    this.setState({ errors });
  };

  setData = (input) => {
    if (input.name) {
      const data = { ...this.state.data };
      if (input.name === "numberOfStudent") {
        data[input.name] = input.value.replace(/\D/, "");
        this.setState({ data });
      } else if (input.name === "startDate") {
        data.endDate = "";
        data.endTime = "";
        data[input.name] = input.value;
        this.setState({ data });
      } else if (input.name === "startTime") {
        data.endTime = "";
        data[input.name] = input.value;
        this.setState({ data });
      } else {
        data[input.name] = input.value;
        this.setState({ data });
      }
    }
  };

  handleSubmit = (e) => {
    if (e) e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChangeSelect = ({ currentTarget: input }) => {
    this.setErrors(input);
    this.setData(input);
  };

  handleChange = ({ currentTarget: input }) => {
    this.setData(input);
  };

  handleBlur = ({ currentTarget: input }) => {
    this.setErrors(input);
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options, readOnly = false, defaultValue) {
    const { data, errors } = this.state;

    return data[name] ? (
      <SelectUpdate
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChangeSelect}
        error={errors[name]}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    ) : (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChangeSelect}
        error={errors[name]}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    );
  }

  rendereditSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <EditSelect
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChangeSelect}
        error={errors[name]}
      />
    );
  }

  renderInput(
    name,
    label,
    placeholder,
    type = "text",
    toolData,
    readOnly = false,
    disabled
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        type={type ? type : "text"}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={errors[name]}
        readOnly={readOnly}
        placeholder={placeholder}
        toolData={toolData}
        disabled={disabled}
      />
    );
  }
  renderQuery(name, label, type = "text", readOnly = false) {
    const { data, errors } = this.state;

    return (
      <Query
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={errors[name]}
        readOnly={readOnly}
      />
    );
  }

  renderTextarea(name, label, type = "text", disabled, placeholder) {
    const { data, errors } = this.state;

    return (
      <Textarea
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={errors[name]}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  renderEdit(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <EditInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSucess(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <SuccessInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderPasswordInput(name, label, type = "password", page) {
    const { data, errors } = this.state;
    return (
      <Password
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={errors[name]}
        page={page}
      />
    );
  }
}

export default Form;
