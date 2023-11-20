import React from "react";

//Images

import alertIcon from "../../include/images/danger.svg";

const AlertError = (props) => {
  return (
    <>
      <span class="alert-icon alert-error-fix">
        <i>
          <img src={alertIcon} alt="" />
        </i>
      </span>
      <p>{props.message}</p>
    </>
  );
};

export default AlertError;
