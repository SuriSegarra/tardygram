const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const chance = require('chance').Chance();

module.exports = async({ usersToCreate = 5, postsToCreate = 5 } = {}) => {
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

  await Post.create([...Array(postsToCreate)].map(() => ({
    user: loggedInUser._id,
    photoUrl: chance.url(),
    caption: chance.sentence(),
    tags: chance.animal()
  })));


};
