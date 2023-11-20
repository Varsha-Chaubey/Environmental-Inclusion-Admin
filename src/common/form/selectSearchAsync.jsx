import React, { Component, createRef } from "react";
import AsyncSelect from "react-select";
import ReactTooltip from "react-tooltip";
import errorIcon from "@images/Info-icon.svg";
import _ from "lodash";

class SelectSearchAsync extends Component {
  state = {
    objValue: null,
    inputValue: "",
    loading: false,
  };
  selectRef = createRef(null);
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && this.props.value !== "") {
      this.setState({
        objValue: {
          name: this.props.value,
          value: this.props.value,
        },
      });
    }
  }
  customStyles = {
    indicatorSeparator: (styles) => ({ display: "none" }),
    option: (provided, state) => ({
      ...provided,
      "&:hover": {
        backgroundColor: "#00315C",
        color: "#fff",
      },
      borderRadius: 4,
      color: state.isSelected ? "#fff" : "black",
      backgroundColor: state.isSelected ? "#00315C" : provided.backgroundColor,
    }),
    control: (base, state) => ({
      ...base,
      height: 48,
      backgroundColor: "#F5F5F5",
      minHeight: 48,
      borderRadius: 5,
      fontSize: 14,
      borderColor: state.isFocused
        ? this.props.error
          ? "red"
          : "#03658C"
        : this.props.error
        ? "red"
        : "#f5f5f5",
      boxShadow: "0 !important",
      "&:hover": {
        borderColor: "#03658c",
      },
      "&:focus": {
        borderColor: "#03658c",
      },
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      "&:hover": {
        backgroundColor: "rgb(95, 50, 187, 10%)",
        color: "#6119c0",
      },
    }),
  };
  handleInputChange = (newValue, action) => {
    const inputValue = newValue;
    if (action.action === "menu-close") {
      this.setState({ inputValue: "" });
      this.props.loadOptions("");
    }
    if (action.action === "input-change") {
      this.setState({ inputValue });
      this.props.loadOptions(inputValue);
    }
    return inputValue;
  };
  onScroll = (e2) => {};
  render() {
    const {
      name,
      options,
      label,
      error,
      value,
      defaultValue,
      disabled,
      isLoading,
      ...rest
    } = this.props;
    var newVal = "";
    if (!_.isEmpty(value)) {
      newVal = value;
    }
    return (
      <div className="form-group ">
        {error && (
          <ReactTooltip
            backgroundColor={"white"}
            style={{
              boxShadow: "0px 5px 30px rgb(0 0 0 / 10%)",
              borderRadius: "4px",
            }}
            textColor={"black"}
            border={true}
            borderColor="grey"
            html={true}
            id={`${name}-err`}
          />
        )}
        <AsyncSelect
          {...rest}
          onInputChange={this.handleInputChange}
          onChange={(a) =>
            this.props.onChange({
              name: this.props.name,
              currentTarget: { value: a.value, name: a.name, user: a.user },
            })
          }
          isDisabled={disabled}
          ref={this.selectRef}
          options={
            isLoading
              ? []
              : name === "country"
              ? [
                  {
                    label: "Popular",
                    options: [{ name: "United States", value: "230" }],
                  },
                  {
                    label: "All",
                    options: options,
                  },
                ]
              : options
          }
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.value}
          defaultOptions
          cacheOptions
          placeholder={label}
          styles={this.customStyles}
          value={newVal}
          isLoading={isLoading}
        />
        {error && (
          <>
            <span class="select-dropdown-error">
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
    );
  }
}

export default SelectSearchAsync;
