const joi = require('joi');

const validateSignup = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required().valid(joi.ref('password')),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  return next();
};

module.exports = validateSignup;
