const { getAgent, getPost, getUser, getComment } = require('../db/data-helpers');

describe('comments route', () => {
  it('creates a comment', async()=> {
    const user = await getUser({ username: 'suri' });
    const post = await getPost({ user: user._id });
 
    return getAgent()
      .post('/api/v1/comments')
      .send({
        comment: 'some comment',
        commentBy: user._id,
        post: post._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          comment: expect.any(String),
          commentBy: user._id,
          post: post._id,
          __v: 0
        });
      });
  });
  it('deletes a comment by id', async() => {
    const comment = await getComment();
    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});
