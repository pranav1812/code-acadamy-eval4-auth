const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SIGNING_KEY } = require('../utils/config');

const createUser = async (user) => {
  const { username, password, role } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username,
    password: hashedPassword,
  };
  const createdUser = await User.create(newUser);
  return {
    username: createdUser.dataValues.username,
    role: createdUser.dataValues.role,
  };
};

const signinUser = async (user) => {
  const { username, password } = user;
  // const hashedPassword = await bcrypt.hash(password, 10);
  let getFromDB = await User.findOne({ where: { username } });
  getFromDB = getFromDB.dataValues;
  console.log('from db', getFromDB);

  if (getFromDB === {} || !getFromDB) {
    throw new Error('USER_NOT_FOUND');
  }
  const isPasswordCorrect = await bcrypt.compare(password, getFromDB.password);
  console.log('comparing pass');
  if (!isPasswordCorrect) {
    throw new Error('WRONG_PASSWORD');
  }
  const token = jwt.sign({ username, role: getFromDB.role }, JWT_SIGNING_KEY, {
    expiresIn: '1000h',
  });

  console.log('token', token);
  return token;
};

const validateToken = async (token) => {
  const decodedToken = jwt.verify(token, JWT_SIGNING_KEY);
  if (!decodedToken) {
    throw new Error('INVALID_TOKEN');
  }
  return decodedToken;
};

module.exports = {
  createUser,
  signinUser,
  validateToken,
};
