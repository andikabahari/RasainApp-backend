const handleAsync = require("../utils/handleAsync");

const index = handleAsync(async (req, res) => {
  res.json({
    error: false,
    message: "Welcome!",
  });
});

module.exports = { index };
