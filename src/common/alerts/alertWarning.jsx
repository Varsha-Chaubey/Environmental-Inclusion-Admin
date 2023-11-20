import React from "react";

//Images
import closeIcon from "../../include/images/close-icon.svg";
import warnIcon from "../../include/images/warning.svg";

const AlertWarning = (props) => {
  return (
    <>
      <span class="alert-icon alert-warning-icon">
        <i>
          <img src={warnIcon} alt="" />
        </i>
      </span>
      <p>{props.message}</p>
    </>
  );
};

export default AlertWarning;
