import React, { Component } from "react";
import clipIm from "../../../include/images/paper-clip.svg";

class FileInput extends Component {
  state = {};
  render() {
    const {
      label,
      name,
      text,
      status,
      onchange,
      error,
      flag,
      totalUploaded,
      disabled,
      optional,
    } = this.props;
    return (
      <div className="form-group custom-upload">
        <label>
          {label}
          {optional && <span>Optional</span>}
        </label>
        <label
          key={disabled}
          style={{
            backgroundColor: this.props.disabled === true ? "#e9ecef" : "auto",
          }}
          className={
            error
              ? "btn btn-upload btn-block pull-left errorColor"
              : "btn btn-upload btn-block pull-left"
          }
          htmlFor={name}
        >
          <span>
            <img src={clipIm} alt="" />
            {!totalUploaded
              ? status
              : "Uploaded successfully. Click here to change"}
          </span>{" "}
        </label>
        <input
          accept="image/png,image/jpeg,image/jpg"
          type="file"
          id={name}
          name={name}
          className="d-none"
          onChange={onchange}
          multiple={flag}
          disabled={disabled}
        />
        {!flag ? (
          <>
            {text && (
              <a
                className="add-more-field"
                href={process.env.REACT_APP_S3URL + text}
                style={{ fontSize: "11px" }}
                target="_blank"
                download
              >
                Click here to view your uploaded {label}
              </a>
            )}

            {/* <span className="note">Image Format - JPEG</span> */}
          </>
        ) : (
          <span className="note">
            <strong>Note :</strong> If you don't own or perform consultation in
            any clinic kindly mention the your physical location.
          </span>
        )}
        {error && <label className="errorLabel">{error}</label>}
      </div>
    );
  }
}

export default FileInput;
