import express, { Request, Response } from 'express';
import { User, listOfUsers } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../middleware/logger';
import verifyAuthToken from '../middleware/verifyAuthToken';

const Users = new listOfUsers();
dotenv.config();
declare var process: {
  env: {
    JWT_KEY: string;
  };
};
const index = async (req: Request, res: Response) => {
  const users = await Users.index();
  if (users.length > 0) {
    res.status(200);
    return res.json(users);
  } else {
    res.status(200);
    return res.json('There is no users to show');
  }
};

const authenticate = async (_req: Request, res: Response) => {
  // aka: show
  const user = await Users.authenticate(_req.body.username, _req.body.password);
  if (user !== null) {
    res.status(200);
    return res.json(user);
  } else {
    return res.json('Invalid Credentials');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
    };
    const newUser = await Users.create(user);
    var token = jwt.sign({ User: newUser }, process.env.JWT_KEY);
    res.status(200);
    return res.json(token);
  } catch (error) {
    res.status(401);
    return res.json(error);
  }
};

const users_routes = (app: express.Application) => {
  app.post('/login', logger, verifyAuthToken, authenticate);
  app.post('/signup', logger, create);
  app.get('/users', logger, verifyAuthToken, index);
};

export default users_routes;
