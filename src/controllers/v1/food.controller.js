const handleAsync = require("../../utils/handleAsync");

const predict = handleAsync(async (req, res) => {
  res.json({
    error: false,
    message: "Image uploaded successfully",
    result: {},
  });
});

module.exports = { predict };
