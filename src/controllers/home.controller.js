const index = (req, res) => {
  res.json({
    error: false,
    message: "Welcome!",
  });
};

module.exports = { index };
