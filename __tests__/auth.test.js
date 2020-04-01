require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');


describe('auth routes', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'suri',
        password: 'suriWasHere',
        profilePhotoUrl: 'url'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'suri',
          profilePhotoUrl: expect.any(String),
          __v: 0
        });
      });
  });
  it('logs in a user', async() => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'suri',
        password: 'suriWasHere',
        profilePhotoUrl: 'url'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'suri',
          profilePhotoUrl: expect.any(String),
          __v: 0
        });
      });
  });
  it('fails to login a user with a bad password', async() => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'suri',
        password: 'suriWasHere'
      })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid username/ password',
          status: 403
        });
      });
  });
});


