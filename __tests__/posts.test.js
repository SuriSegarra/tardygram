const { getAgent, getUser, getPost, getPosts } = require('../db/data-helpers'
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
  it('gets post by id', async() => {
    const user = await getUser({ username: 'suri'});
    const post = await getPost({ user: user._id });

    return getAgent()
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          user,
        });
      });
  });

  it('gets all posts', async() => {
    const user = await getUser({ username: 'suri' });
    const posts = await getPosts({ user: user._id });
    return getAgent()
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toEqual(posts);
      });
  });
  it('updates a post by id', async() => {
    const user = await getUser({ username: 'suri' });
    const post = await getPost({ user: user._id });
    return getAgent()
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'some caption' })
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          caption: expect.any(String)
        });
      });
  });
  it('deletes a post', async() => {
    const user = await getUser({ username: 'suri' });
    const post = await getPost({ user: user._id });

    return getAgent()
      .delete(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual(post);
      });
  });
});

