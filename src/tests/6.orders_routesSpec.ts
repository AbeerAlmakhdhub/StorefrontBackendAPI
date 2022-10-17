import supertest from 'supertest';
import app from '../server';
import { token } from './4.users_routesSpec';
const request = supertest(app);

describe('Order Handlers', () => {
  it(`Should require authorization on getting user's active orders`, (done) => {
    request.get(`/userActiveOrders/${1}`).then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });

  it(`Should require authorization on getting user's complete orders`, (done) => {
    request.get(`/userComplateOrders/${1}`).then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });

  //------------------------------------------------
  it(`getting user's active orders`, (done) => {
    const res = request
      .get(`/userActiveOrders/${1}`)
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it(`getting user's complete orders`, (done) => {
    const res = request
      .get(`/userComplateOrders/${1}`)
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
