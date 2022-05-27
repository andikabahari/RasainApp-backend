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

const getPredictions = handleAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "File not attached");
  }

  const fileExtension = req.file.mimetype.split("/")[1];
  const allowedExtensions = ["jpg", "jpeg", "png", "bmp", "gif"];
  if (!allowedExtensions.includes(fileExtension)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "File extension must be: " + allowedExtensions.join(", ")
    );
  }

  const imageBuf = await sharp(req.file.buffer).resize(150, 150).toBuffer();
  const imageUint = Uint8Array.from(imageBuf);
  const scores = await predict(imageUint);

  let predictions = [];
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > 0) {
      predictions.push({
        label: labels[i],
        score: scores[i].toString(),
      });
    }
  }

  predictions.sort((p1, p2) => {
    return p2.score.localeCompare(p1.score, undefined, { numeric: true });
  });

  res.json({
    error: false,
    message: "Prediction successful",
    data: { predictions },
  });
});

module.exports = { getPredictions };
