require("dotenv").config();
const express = require("express");

const homeController = require("./controllers/home.controller");

const app = express();
const port = process.env.APP_PORT;

app.get("/", homeController.index);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
