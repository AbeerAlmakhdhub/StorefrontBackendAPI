import supertest from 'supertest';
import app from '../server';
import { Product } from '../models/product';
import verifyAuthToken from '../middleware/verifyAuthToken';
import { token } from './4.users_routesSpec';
const request = supertest(app);

describe('Product Handlers', () => {
  let Product_id: number = 1;

  const resultProduct: Product = {
    id: 1,
    productName: 'Chenille Plain Weave Washed Ivory Pleated Desk Chair',
    category: 'chair',
    price: 1349,
  };

  it('Should require authorization on create', (done) => {
    request.post('/product/create').then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });

  //------------------------------------------------
  it('Post the created Product through endpoint', async () => {
    const res = await request
      .post('/product/create')
      .set('Authorization', token)
      .send(resultProduct);
    expect(res.status).toBe(200);
  });
  it('get a product by id using endpoint', (done) => {
    const res = request
      .get(`/product/${Product_id}`)
      .send({})
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the index of products from endpoint', (done) => {
    request.get('/Products').then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
});
