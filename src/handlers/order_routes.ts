import { Order, Orders } from '../models/order';
import express, { Request, Response } from 'express';
import logger from '../middleware/logger';
import verifyAuthToken from '../middleware/verifyAuthToken';

const orders = new Orders();

const index = async (_req: Request, res: Response) => {
  const ordersList = await orders.index();
  return res.json(ordersList);
};

const show = async (req: Request, res: Response) => {
  const order = await orders.show(req.params.id);
  res.status(200);
  return res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: 'active',
      user_id: parseInt(req.params.id),
    };

    const newOrder = await orders.create(order);
    res.status(200);
    return res.json(newOrder);
  } catch (error) {
    res.status(400);
    return res.json(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const idParam = parseInt(req.params.id);
    const order: Order = {
      id: idParam,

      status: req.body.status,
      user_id: req.body.user_id,
    };
    const updatedOrder = await orders.update(order);
    res.status(200);
    res.json(updatedOrder);
  } catch (error) {
    res.status(400);
    return res.json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  const deleted = await orders.delete(req.params.id);
  if (typeof deleted === 'undefined') {
    res.status(200);
    return res.json("Order already deleted or doesn't exist");
  } else {
    res.status(200);
    return res.json(
      'Order with id:' + deleted.id + ' was deleted successfully!'
    );
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const order = await orders.addProduct(
      req.body.quantity,
      req.body.orderId,
      req.body.productId,
      req.body.user_id
    );
    res.status(200);
    return res.json(order);
  } catch (error) {
    res.status(400);
    return res.json(
      `Could not add product ${req.body.productId} to order ${req.body.orderId}: ${error}`
    );
  }
};
const fullOrder = async (req: Request, res: Response) => {
  try {
    const order = await orders.fullOrder(parseInt(req.params.id));
    return res.json(order);
  } catch (error) {
    res.status(400);
    return res.json(error);
  }
};
const userActiveOrders = async (req: Request, res: Response) => {
  try {
    const order = await orders.userActiveOrders(parseInt(req.params.id));
    return res.json(order);
  } catch (error) {
    res.status(400);
    return res.json(error);
  }
};
const userComplateOrders = async (req: Request, res: Response) => {
  try {
    const order = await orders.userComplateOrders(parseInt(req.params.id));
    return res.json(order);
  } catch (error) {
    res.status(400);
    return res.json(error);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders', logger, verifyAuthToken, index);
  app.get('/orders/:id', logger, verifyAuthToken, show);
  app.get('/orders/closetheOrder/:id', logger, verifyAuthToken, update);
  app.get('/createOrder/:id', logger, verifyAuthToken, create);
  app.delete('/orders/:id', logger, verifyAuthToken, destroy);
  app.post('/orders/add', logger, verifyAuthToken, addProduct);
  app.get('/orders/fullOrder', logger, verifyAuthToken, fullOrder);
  app.get('/userActiveOrders/:id', logger, verifyAuthToken, userActiveOrders);
  app.get(
    '/userComplateOrders/:id',
    logger,
    verifyAuthToken,
    userComplateOrders
  );
};
export default orders_routes;
