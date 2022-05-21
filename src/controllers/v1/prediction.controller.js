const handleAsync = require("../../utils/handleAsync");

const getPrediction = handleAsync(async (req, res) => {
  res.json({
    error: false,
    message: "Image uploaded",
    data: {
      prediction: {},
    },
  });
});

module.exports = { getPrediction };
