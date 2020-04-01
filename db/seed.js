const User = require('../lib/models/User');
const chance = require('chance').Chance();

module.exports = async({ usersToCreate = 5 } = {}) => {
  const loggedInUser = await User.create({
    username: 'suri',
    password: 'suriWasHere',
    profilePhotoUrl: 'https://picsum.photos/200/300'
  });
  const users = await User.create([...Array(usersToCreate)].map(() => ({
    username: chance.name(),
    password: chance.animal(),
    profilePhotoUrl: chance.url()
  })));

};