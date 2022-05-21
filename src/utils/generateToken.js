const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const secret = process.env.TOKEN_SECRET;
  return jwt.sign(payload, secret);
};

module.exports = generateToken;
