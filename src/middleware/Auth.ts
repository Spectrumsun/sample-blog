import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { CustomRequest } from '../dto';

class Auth {
  static verifyAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.token 
        || req.query.token 
        || req.header('Authorization')?.replace('Bearer ', '');
      
      if(!token) {
        throw new Error()
      }
      const decoded = jwt.verify(token, config.SECRET_KEY as string); 
      (req as CustomRequest).user = decoded;
      next();
    } catch(err) {
      res.status(401).json({
        success: false,
        message: 'Please authenticate',
      });
    }
  }
}

export default Auth;

