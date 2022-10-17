import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
declare var process: {
  env: {
    JWT_KEY: string;
  };
};

/*We complete the function, not with a return but by calling next. 
If the token could not be verified, we will send that 401 error.*/
const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = req.headers['authorization'];
    jwt.verify(token || '', process.env.JWT_KEY); // '' in case of undefined, which implies no token; thus unauthorized
    next();
  } catch (error) {
    res.status(401);
    return res.json('Access denied, invalid token');
  }
};

export default verifyAuthToken;
