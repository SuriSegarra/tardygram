const { Router } = require('express');
const User = require('../models/User');

const One_day_in_ms = 1000 * 60 * 60 * 24;
//creating jwt
const handleAuthorization = (res, user) => {
  res.cookie('session', user.authToken(), {
    maxAge: One_day_in_ms,
    httpOnly: true
  });
  res.send(user);
};
module.exports = Router()
  .post('/signup', (req, res, next) => {
    //create a new user 
    User 
      .create(req.body)
      //we get the created user and create a jwt
      .then(user => handleAuthorization(res, user))
      
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    User
    //check the user's usernmae and password(authorize)
      .authorize(req.body)
      //we get the  user and create a jwt
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })
  .get('/verify', (req, res) => {
    //send the user if the person is logged in
    res.send(req.user);
    //send an error if the person is NOT logged in is handled by ensureAuth
  });
