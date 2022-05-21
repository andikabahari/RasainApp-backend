const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.match(/bearer .+/i)) {
    throw new Error("Token undefined");
  }

  try {
    const token = authHeader.split(" ")[1];
    req.payload = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    throw err;
  }
};

module.exports = auth;
