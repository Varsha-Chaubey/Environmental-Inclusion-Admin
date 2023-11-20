import _ from "lodash";
const errorMessages = {
  required: "{field} is required",
  min: "{field} should have minimum {limit} characters",
  max: "{field} should have maximum  {limit} characters",
  email: "{field} is invalid",
  confirm: "Password and {field} fields do not match",
  number: "{field} is invalid",
  numberMin: "ZERO BID IS NOT ALLOWED.",
};

const renderError = (error, type) => {
  const message = errorMessages[type];
  return message.replace("{field}", _.startCase(_.toLower(error.local.label))).replace("{limit}", error.local.limit);
};

export const validateErrorMessage = (errors) => {
  errors.forEach((err) => {
    switch (err.code) {
      case "any.required":
        err.message = renderError(err, "required");
      case "string.empty":
        err.message = renderError(err, "required");
        break;
      case "string.email":
        err.message = renderError(err, "email");
        break;
      case "string.min":
        err.message = renderError(err, "min");
        break;
      case "number.min":
        err.message = renderError(err, "numberMin");
        break;
      case "string.max":
        err.message = renderError(err, "max");
        break;
      case "any.only":
        err.message = renderError(err, "confirm");
        break;
      case "number.base":
        err.message = renderError(err, err.local.value ? "number" : "required");
      default:
        break;
    }
  });
  return errors;
};
