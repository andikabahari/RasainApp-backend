const errorHandler = (err, req, res, next) => {
  const { message, statusCode } = err;
  res.status(statusCode).json({ error: true, message });
};

module.exports = errorHandler;
