const httpStatus = require("http-status");
const moment = require("moment");
const handleAsync = require("../../utils/handleAsync");
const db = require("../../utils/db");
const hash = require("../../utils/hash");
const ApiError = require("../../utils/ApiError");

const login = handleAsync(async (req, res) => {
  res.json({
    error: false,
    message: "Login successful",
    data: {
      user: {
        userId: 69,
        fullName: "Allan Holdsworth",
        email: "allan@example.com",
      },
      token: "thisismytoken",
    },
  });
});

const register = handleAsync(async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const usersRef = await db.collection("users");

    const users = await usersRef.where("email", "==", email).get();
    if (users.size) {
      return res.json({
        error: true,
        message: "Email taken",
      });
    }

    await usersRef.add({
      fullName,
      email,
      password: hash(password),
      createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    });

    res.json({
      error: false,
      message: "Registration successful",
    });
  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server error");
  }
});

module.exports = { login, register };
