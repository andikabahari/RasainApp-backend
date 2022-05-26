const httpStatus = require("http-status");
const sharp = require("sharp");
const handleAsync = require("../../utils/handleAsync");
const predict = require("../../utils/predict");
const ApiError = require("../../utils/ApiError");

const labels = [
  "bakso",
  "klepon",
  "nasi-goreng",
  "onde-onde",
  "pastel",
  "rendang",
  "sate",
  "tahu-petis",
];

const getPrediction = handleAsync(async (req, res) => {
  try {
    const imageBuf = await sharp(req.file.buffer).resize(150, 150).toBuffer();
    const imageUint = Uint8Array.from(imageBuf);
    const prediction = await predict(imageUint);

    let predictionWithLabels = {};
    for (let i = 0; i < prediction.length; i++) {
      predictionWithLabels[labels[i]] = prediction[i];
    }

    res.json({
      error: false,
      message: "Prediction successful",
      data: { prediction: predictionWithLabels },
    });
  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server error");
  }
});

module.exports = { getPrediction };
