const Joi = require("joi");

const register = Joi.object().keys({
  fullName: Joi.string().required().max(128),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  register,
  login,
};
