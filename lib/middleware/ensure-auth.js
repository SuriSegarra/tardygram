const User = require('../models/User');

module.exports = (req, res, next) => {
  //read the session cookied. 
  const token = req.cookies.session;
  //check our JWT
  User 
    .findByToken(token)
    //we will get back our user 
    .then(user => {
      //set a user if the JWT is valid
      req.user = user;
      next();
    })
    //otherwise send an error
    .catch(next);
};
