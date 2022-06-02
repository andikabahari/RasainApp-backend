require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");
const errorLogger = require("./middlewares/errorLogger");
const errorHandler = require("./middlewares/errorHandler");
const errorConverter = require("./middlewares/errorConverter");
const notFoundHandler = require("./middlewares/notFoundHandler");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
