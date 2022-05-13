const register = (req, res) => {
  res.json({
    error: false,
    message: "New account created",
    token: "thisismytoken",
  });
};

module.exports = { register };
