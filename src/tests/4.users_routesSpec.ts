import supertest from 'supertest';
import app from '../server';
import { User } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';
import client from '../database';

const request = supertest(app);
let token: string,
  user_id: number = 1;
describe('User Handlers', () => {
  const resultUser: User = {
    firstname: 'fauna',
    lastname: 'fairy',
    username: 'fauna',
    password: 'green',
  };
  beforeAll(async () => {
    try {
      const connection = await client.connect();
      const query = 'TRUNCATE order_products, orders, users RESTART IDENTITY';
      const result = await connection.query(query);
      connection.release();
      //
    } catch (error) {
      throw new Error();
    }
  });

  beforeEach(function () {
    const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('Should require authorization on login', (done) => {
    request.post('/login').then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });

  it('Should require authorization on login', (done) => {
    request.get('/users').then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });

  //------------------------------------------------

  it('Post the created user through endpoint', async () => {
    const res = await request.post('/signup').send(resultUser);
    token = res.body;
    expect(res.status).toBe(200);
    expect(token).toBeDefined();
  });

  it('posts the credential to log in using endpoint', (done) => {
    const res = request
      .post('/login')
      .send({ username: 'fauna', password: 'green' })
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(200);

        done();
      });
  });

  it('gets the index endpoint', (done) => {
    request
      .get('/users')
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
export { token };
