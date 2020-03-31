require('dotenv').config();
const User = require('./User');

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
});
