import React, { Component } from "react";
import loaderIcon from "../../../include/images/loading-icon.svg";

class SubmitBtn extends Component {
  state = {};
  render() {
    return this.props.onClickHandle ? (
      <button
        onClick={this.props.onClickHandle}
        type="submit"
        className={this.props.btnClass}
        form={this.props.form}
      >
        {this.props.label}
        {this.props.loading && (
          <b className="btn-loader">
            <img
              src={loaderIcon}
              alt="loader"
              className="loader-img fa-spin"
              style={{ height: "15px" }}
            />
          </b>
        )}
      </button>
    ) : (
      <button type="submit" className={this.props.btnClass} form={this.props.form}>
        {this.props.label}
        {this.props.loading && (
          <b className="btn-loader">
            <img
              src={loaderIcon}
              alt="loader"
              className="loader-img fa-spin"
              style={{ height: "15px;" }}
            />
          </b>
        )}
      </button>
    );
  }
}

export default SubmitBtn;
