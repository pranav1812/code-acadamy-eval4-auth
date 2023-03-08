const joi = require('joi');

const validateToken = (req, res, next) => {
  console.log('validateToken middleware called', req.body, '...');
  const schema = joi.object({
    token: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  return next();
};

module.exports = validateToken;
