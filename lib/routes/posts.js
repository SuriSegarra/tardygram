const { Router } = require('express');
const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post
      .create(req.body)
      .then(post => res.send(post))
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    Post
      .findById({ _id: req.params.id, user: req.params.id })
      .populate('user')
      .then(post => res.send(post))
      .catch(next);

  });
