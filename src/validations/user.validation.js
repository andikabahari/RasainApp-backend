const Joi = require("joi");

const update = Joi.object().keys({
  fullName: Joi.string().optional().min(1).max(128),
  email: Joi.string().optional().email(),
  password: Joi.string().optional().min(8),
});

module.exports = { update };
