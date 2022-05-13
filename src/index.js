require("dotenv").config();
const express = require("express");

const homeController = require("./controllers/home.controller");
const loginController = require("./controllers/v1/login.controller");

const app = express();
const port = process.env.APP_PORT;

app.get("/", homeController.index);
app.get("/v1/login", loginController.login);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
