const httpStatus = require("http-status");
const moment = require("moment");
const bcrypt = require("bcrypt");
const handleAsync = require("../../utils/handleAsync");
const db = require("../../utils/db");
const hash = require("../../utils/hash");
const generateToken = require("../../utils/generateToken");
const ApiError = require("../../utils/ApiError");
const authValidation = require("../../validations/auth.validation");

const login = handleAsync(async (req, res) => {
  try {
    await authValidation.login.validateAsync(req.body);
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message);
  }

  try {
    const { email, password } = req.body;

    const usersRef = await db.collection("users");
    const usersRes = await usersRef.where("email", "==", email).get();
    if (usersRes.size === 0) {
      return res.json({
        error: true,
        message: "Email is not registered",
      });
    }

    const user = usersRes.docs[0].data();
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({
        error: true,
        message: "Password is incorrect",
      });
    }

    const userId = usersRes.docs[0].id;
    const token = generateToken({ userId });
    res.json({
      error: false,
      message: "Login successful",
      data: {
        user: {
          userId,
          fullName: user.fullName,
          email: user.email,
        },
        token,
      },
    });
  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server error");
  }
});

const register = handleAsync(async (req, res) => {
  try {
    await authValidation.register.validateAsync(req.body);
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message);
  }

  try {
    const { fullName, email, password } = req.body;

    const usersRef = await db.collection("users");
    const usersRes = await usersRef.where("email", "==", email).get();
    if (usersRes.size > 0) {
      return res.json({
        error: true,
        message: "Email is already taken",
      });
    }

    await usersRef.add({
      fullName,
      email,
      password: hash(password),
      createdDate: moment(new Date()).format("YYYY-MM-DD"),
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
