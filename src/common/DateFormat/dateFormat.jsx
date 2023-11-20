import React, { Component } from "react";
import moment from "moment";

const DateFormat = (props) => {
  const d = new Date();
  let diff = d.getTimezoneOffset();
  return (
    <>
      {props.date === "Surplus Inventory"
        ? "Surplus Inventory"
        : moment(props.date)
            .add({ minute: diff })
            .format("MMM-D-YYYY, h:mm:ss A") === "Invalid date"
        ? ""
        : moment(props.date)
            .add({ minute: diff })
            .format("MMM-D-YYYY, h:mm:ss A") + " CST"}
    </>
  );
};

export default DateFormat;
