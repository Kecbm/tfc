import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import Token from '../interfaces/Token';

class validateJWT {
  private secret = process.env.JWT_SECRET || 'jwt_secret';

  public decode = (token: string) => {
    const { user } = jwt.verify(token, this.secret) as Token;

    return user;
  };

  public validate = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    try {
      if (!authorization) return res.status(401).json({ message: 'Token must be a valid token' });

      jwt.verify(authorization, this.secret);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default validateJWT;
