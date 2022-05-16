const login = (req, res) => {
  res.json({
    error: false,
    message: "You have logged in successfully",
    token: "thisismytoken",
  });
};

const register = (req, res) => {
  res.json({
    error: false,
    message: "New account created",
    token: "thisismytoken",
  });
};

module.exports = { login, register };
