const tf = require("@tensorflow/tfjs-node");

const predict = async (image) => {
  image = tf.node.decodeImage(image);
  image = tf.expandDims(image);
  const path = `file://${process.env.TENSORFLOW_SAVED_MODEL}`;
  const model = await tf.loadLayersModel(path);
  const result = model.predict(image);
  return result.data();
};

module.exports = predict;
