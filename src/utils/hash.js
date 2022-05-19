const bcrypt = require("bcrypt");

const hash = (password) => {
  const saltRounds = process.env.SALT_ROUNDS || 10;
  const salt = bcrypt.genSaltSync(parseInt(saltRounds));
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

module.exports = hash;
