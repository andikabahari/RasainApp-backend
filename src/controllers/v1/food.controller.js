const predict = (req, res) => {
  res.json({
    error: false,
    message: "Image uploaded successfully",
    result: {},
  });
};

module.exports = { predict };
