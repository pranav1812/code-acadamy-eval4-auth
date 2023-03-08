const joi = require('joi');

const validateSignin = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  return next();
};

module.exports = validateSignin;
