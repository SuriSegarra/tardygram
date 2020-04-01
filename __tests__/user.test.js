require('dotenv').config();
const User = require('../lib/models/User');

describe('user model', () => {
  it('hashes passowrd', () => {
    //creating a user
    const user = new User({
      username: 'suri',
      password: 'suriWasHere'
    });
    //when we turn our user into json and grab the passwordHarsh we expect to exist 
    expect(user.passwordHash).toEqual(expect.any(String));
    //we dont want the actual password to exist. Only passwordhash
    expect(user.toJSON().password).toBeUndefined();
    
  });
  it('creates a jwt auth token', () => {
    const user = new User ({
      username: 'suri',
      password: 'suriWasHere'
    });
    const token = user.authToken();
    expect(token).not.toBeUndefined();
  });
  //to make sure the token is associated with user
  it('finds a user by token', () => {

    const user = new User ({
      username: 'suri',
      password: 'suriWasHere'
    });
    //create token from that user
    const token = user.authToken();
    //let us convert token into user 
    User
      .findByToken(token)
      .then(founduser => {
        expect(founduser.toJSON()).toEqual(user.toJSON());
      });
  });
});
