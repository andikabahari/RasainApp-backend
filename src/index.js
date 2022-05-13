require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./router");

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
