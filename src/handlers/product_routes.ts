import { Product, Products } from '../models/product';
import express, { Request, Response } from 'express';

import logger from '../middleware/logger';
import verifyAuthToken from '../middleware/verifyAuthToken';

const products = new Products();

const index = async (_req: Request, res: Response) => {
  const productsList = await products.index();
  if (productsList.length > 0) {
    return res.json(productsList);
  } else {
    return res.json('There is no products to show');
  }
};

const show = async (req: Request, res: Response) => {
  const product = await products.show(req.params.id);
  return res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      productName: req.body.productName,
      category: req.body.category,
      price: req.body.price,
    };
    const newProduct = await products.create(product);
    return res.json(newProduct);
  } catch (error) {
    res.status(400);
    return res.json(error + '.');
  }
};
const destroy = async (req: Request, res: Response) => {
  const deleted = await products.delete(req.body.id);
  return res.json(deleted);
};
const productsByCategory = async (req: Request, res: Response) => {
  const productsList = await products.productsByCategory(req.params.category);
  if (productsList.length > 0) {
    return res.json(productsList);
  } else {
    return res.json('There is no products to show in this category.');
  }
};
const topFive = async (req: Request, res: Response) => {
  const productsList = await products.topFive();
  if (productsList.length > 0) {
    return res.json(productsList);
  } else {
    return res.json('There is no products to show.');
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products', logger, index);
  app.get('/product/:id', logger, show);
  app.post('/product/create', logger, verifyAuthToken, create);
  app.delete('/deleteProduct/:id', logger, verifyAuthToken, destroy);
  app.get('/productsByCategory/:category', logger, productsByCategory);
  app.get('/topFiveProducts', logger, topFive);
};
export default products_routes;
