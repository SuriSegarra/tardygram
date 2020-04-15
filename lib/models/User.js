const mongoose = require('mongoose');
const { hashSync, compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePhotoUrl: {
    type: String,
    required: true
  }
}, {
  //whenever toJSon is called, automatically deletes passwordHash
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});
//virtual so we never save a plain text password in our db
schema.virtual('password').set(function(password) {
  //hashing password 
  const hash = hashSync(password, 4);
  this.passwordHash = hash;
});

schema.statics.authorize = async function({ username, password }) {
  const user = await this.findOne({ username });
  //check if the user exists with username
  if(!user) {
    //if not...
    const error = new Error('Invalid username/password');
    error.status = 403;
    //...throw an error
    throw error;
  }
  //check that the user with username has a matching password
  const matchingPasswords = await compare(password, user.passwordHash);
  //if not
  if(!matchingPasswords) {
    //...throw error
    const error = new Error('Invalid username/password');
    error.status = 403; 
    throw error;
  }
  //if both are true, return the user
  return user;
};

schema.methods.authToken = function() {
  //use jwt to create a token for our user and return it
  const token = sign({ payload: this.toJSON() }, process.env.APP_SECRET);

  return token;
};

//take a token and get a user
schema.statics.findByToken = function(token) {
  try {
      
    //payload is our user
    //take a token...
    const { payload } = verify(token, process.env.APP_SECRET);
    //return user who owns the token
    return Promise.resolve(this.hydrate(payload));
  } catch(e){
    return Promise.reject(e);
  }
};



module.exports = mongoose.model('User', schema);
