require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpStatus = require("http-status");
const router = require("./router");
const errorLogger = require("./middlewares/errorLogger");
const errorHandler = require("./middlewares/errorHandler");
const errorConverter = require("./middlewares/errorConverter");
const ApiError = require("./utils/ApiError");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorLogger);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
