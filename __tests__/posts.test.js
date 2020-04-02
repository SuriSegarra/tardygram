const { getAgent, getUser, getPost } = require('../db/data-helpers'
);

describe('post routes', () => {

  it('creates a post', async() => {
    const user = await getUser({
      username: 'suri'
    });
    return getAgent()
      .post('/api/v1/posts')
      .send({ 
        user: user._id,
        photoUrl: 'url',
        caption: 'cool caption',
        tags: ['some tags']  
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoUrl: expect.any(String),
          caption: 'cool caption',
          tags: ['some tags'],
          __v: 0
        });
      });
  });
});
