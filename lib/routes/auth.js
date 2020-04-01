const { Router } = require('express');
const User = require('../models/User');

// const ensureAuth = require('../middleware/ensure.auth');

const One_day_in_ms = 1000 * 60 * 60 * 24;

const handleAuthorization = (res, user) => {
  res.cookie('session', user.authToken(), {
    maxAge: One_day_in_ms,
    httpOnly: true
  });
  res.send(user);
};
module.exports = Router()
  .post('/signup', (req, res, next) => {
    User 
      .create(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  });
