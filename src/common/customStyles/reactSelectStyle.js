export const customStyles = {
  indicatorSeparator: (styles) => ({ display: "none" }),

  option: (provided, state) => ({
    ...provided,
    "&:hover": {
      backgroundColor: "#47ad1d",
      color: "#F5F5F5",
    },
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    color: state.isSelected ? "#fff" : "black",
    backgroundColor: state.isSelected ? "#47ad1d" : provided.backgroundColor,
    maxHeight: "84px",
  }),
  control: (base, state) => ({
    ...base,
    height: 42,
    minHeight: 42,
    background: "##f5f5f5",
    borderColor: state.isFocused ? "#47AD1D" : "#e4e4e4",
    boxShadow: state.isFocused ? "0 0 0 0.5px #47AD1D" : "0",
    border: state.isHovered ? "0" : "1px solid #e4e4e4",

    "&:hover": {
      borderColor: state.isFocused ? "#47AD1D" : "0",
      boxShadow: state.isFocused ? "0 0 0 0.5px #47AD1D" : "0",
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
