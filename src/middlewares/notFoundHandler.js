const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");

const notFoundHandler = (err, req, res, next) => {
    const err = new ApiError(httpStatus.NOT_FOUND, "Not found");
    next(err);
};
  
module.exports = notFoundHandler;
  