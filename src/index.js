require("dotenv").config();
const express = require("express");

const homeController = require("./controllers/home.controller");
const loginController = require("./controllers/v1/login.controller");
const registerController = require("./controllers/v1/register.controller");
const userController = require("./controllers/v1/user.controller");

const app = express();
const port = process.env.APP_PORT;

app.get("/", homeController.index);
app.post("/v1/login", loginController.login);
app.post("/v1/register", registerController.register);
app.get("/v1/users", userController.all);
app.get("/v1/users/:id", userController.find);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
