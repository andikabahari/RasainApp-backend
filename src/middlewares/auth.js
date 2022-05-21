const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.match(/bearer .+/i)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Token undefined");
  }

  try {
    const token = authHeader.split(" ")[1];
    req.payload = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
};

module.exports = auth;
