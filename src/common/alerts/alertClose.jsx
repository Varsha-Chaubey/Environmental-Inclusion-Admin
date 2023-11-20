import React from "react";

import closeIcon from "../../include/images/close-icon.svg";

const AlertClose = () => {
  return (
    <span class="alert-right alert-close-icon">
      <a href="#" class="alert-close" data-bs-dismiss="alert">
        <img src={closeIcon} alt="" />
      </a>
    </span>
  );
};

export default AlertClose;
