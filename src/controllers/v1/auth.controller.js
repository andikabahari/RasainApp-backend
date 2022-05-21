const handleAsync = require("../../utils/handleAsync");

const login = handleAsync(async (req, res) => {
  res.json({
    error: false,
    message: "You are successfully logged in",
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
  res.json({
    error: false,
    message: "You have successfully registered",
  });
});

module.exports = { login, register };
