const { Router } = require('express');
const Comment = require('../models/Comment');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Comment
      .create(req.body)
      .then(post => res.send(post))
      .catch(next);
  });
