const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (!error) {
    req.value = value;
    next();
  } else {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
};

module.exports = validate;
