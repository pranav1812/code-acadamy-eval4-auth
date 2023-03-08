const express = require('express');

const router = express.Router();

const AUTH_REQUEST_VALIDATION = require('../schemas/auth');

const AUTH_CONTROLLERS = require('../controllers/auth');

router.post(
  '/signup',
  AUTH_REQUEST_VALIDATION.validateSignup,
  AUTH_CONTROLLERS.createUser
);

router.post(
  '/signin',
  AUTH_REQUEST_VALIDATION.validateSignin,
  AUTH_CONTROLLERS.signinUser
);

router.post(
  '/validateToken',
  AUTH_REQUEST_VALIDATION.validateToken,
  AUTH_CONTROLLERS.validateToken
);

module.exports = router;
