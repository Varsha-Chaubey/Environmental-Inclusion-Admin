import React, { Component } from "react";
import Select from "react-select";
import ReactTooltip from "react-tooltip";
import errorIcon from "@images/Info-icon.svg";

class SelectSearch extends Component {
  state = {
    objValue: null,
  };

  customStyles = {
    indicatorSeparator: (styles) => ({ display: "none" }),
    option: (provided, state) => ({
      ...provided,
      "&:hover": {
        backgroundColor: "#00315c ",
        color: "#fff",
      },
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      color: state.isSelected ? "#fff" : "black",
      backgroundColor: state.isSelected ? "#00315c " : provided.backgroundColor,
      maxHeight: "84px",
      //backgroundColor: state.isSelected ? "rgb(95, 50, 187, 10%)" : "white",
    }),
    // menuList: (styles) => {
    //   console.log("menuList:", styles);
    //   return {
    //     ...styles,
    //     maxHeight: this.props.name === "compensation" ? 120 : 300,
    //   };
    // },
    dropdownIndicator: (style) => ({
      ...style,
      color: this.props.type === "milestonePage" ? "#fff" : style.color,
      "&:hover": {
        color: this.props.type === "milestonePage" ? "#fff" : style.color,
      },
    }),

    placeholder: (style) => ({
      ...style,
      color: this.props.type === "milestonePage" ? "#fff" : style.color,
      "&:hover": {
        color: this.props.type === "milestonePage" ? "#fff" : style.color,
      },
    }),

    control: (base, state) => ({
      ...base,
      // height: 55,

      minHeight: this.props.type === "milestonePage" ? 42 : 55,
      backgroundColor:
        this.props.type === "milestonePage"
          ? this.props.value === "Completed"
            ? "#00C27C"
            : this.props.value === "Overdue"
            ? "#d00a0a"
            : this.props.value === "Upcoming"
            ? "#a800ab"
            : "#ffbe01"
          : base.backgroundColor,
      borderColor: state.isFocused
        ? this.props.error
          ? "red"
          : "#03658c"
        : this.props.error
        ? "red"
        : "#e0e0e0",
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

  render() {
    const {
      name,
      options,
      label,
      error,
      value,
      defaultValue,
      isDisabled,
      ...rest
    } = this.props;

    return (
      <div className=" custom-input">
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
        <Select
          {...rest}
          onChange={(a) =>
            this.props.onChange({
              name: name,
              currentTarget: { value: a.value, name: a.name, data: a.data },
            })
          }
          value={this.props.value}
          className="basic-single"
          classNamePrefix="select-search"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          name={name}
          options={options}
          placeholder={label}
          isDisabled={isDisabled}
          styles={this.customStyles}
          menuPlacement={name === "compensation" ? "top" : "bottom"}
        />
        {error && (
          <>
            <span class="select-dropdown-error select-dropdown-error2">
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

export default SelectSearch;
