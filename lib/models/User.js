const mongoose = require('mongoose');
const { hashSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

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
  const hash = hashSync(password, 10);
  this.passwordHash = hash;
});

// schema.statics.authorize = async function({ username, password }) {
 
// };
schema.methods.authToken = function() {
  const token = sign({ payload: this.toJSON() }, process.env.APP_SECRET);

  return token;
};



module.exports = mongoose.model('User', schema);
