const tf = require("@tensorflow/tfjs-node");

const predict = async (image) => {
  const model = await tf.loadLayersModel(
    `file://${process.env.TENSORFLOW_SAVED_MODEL}`
  );
  // return model.predict(input);
};

module.exports = predict;
