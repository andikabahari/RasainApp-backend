const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const errorConverter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    err = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server error");
  }
  next(err);
};

module.exports = errorConverter;
