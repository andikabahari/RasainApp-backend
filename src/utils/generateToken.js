const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { userId: user.id };
  const secret = process.env.TOKEN_SECRET;
  return jwt.sign(payload, secret);
};

module.exports = generateToken;
