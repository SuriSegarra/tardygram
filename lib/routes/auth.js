const { Router } = require('express');
const User = require('../models/User');
// const ensureAuth = require('../middleware/ensure.auth');
const One_day_in_ms = 1000 * 60 * 60 * 24;
module.exports = Router()
  .post('signup', (req, res, next) => {

    User 
      .create(req.body)
      .then(user => {
        const token = user.authToken();
        res.cookies('session', token, {
          maxAge: One_day_in_ms,
          httpOnl: true
        });
        res.send(user);
      })
      .catch(next);
  });
