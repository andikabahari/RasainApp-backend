const bcrypt = require("bcrypt");

const hash = (password) => {
  const saltRounds = process.env.SALT_ROUNDS || 10;
  const salt = bcrypt.genSaltSync(parseInt(saltRounds));
  return bcrypt.hashSync(password, salt);
};

module.exports = hash;
