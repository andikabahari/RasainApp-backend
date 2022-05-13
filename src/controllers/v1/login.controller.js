const login = (req, res) => {
  res.json({
    error: false,
    message: "You have logged in successfully",
    token: "thisismytoken",
  });
};

module.exports = { login };
