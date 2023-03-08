const AUTH_SERVICES = require('../services/auth');

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await AUTH_SERVICES.createUser({
      username,
      password,
    }); // default role is 'user'
    return res.status(201).json({
      message: 'Created New User',
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const signinUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await AUTH_SERVICES.signinUser({ username, password });
    await redisClient.set(username, token);
    const savedToken = await redisClient.get(username);
    console.log('savedToken', savedToken);

    return res.status(200).json({
      message: 'Signed In User',
      data: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const validateToken = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { token } = req.body;
    const { username, role } = await AUTH_SERVICES.validateToken(token);
    console.log('Valid: ', username);
    const savedToken = await redisClient.get(username);
    console.log('savedToken', savedToken);
    if (savedToken !== token)
      return res.status(401).json({ error: 'FAKE_TOKEN' });
    return res.status(200).json({
      message: 'Validated Token',
      data: {
        username,
        role,
      },
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  signinUser,
  validateToken,
};
