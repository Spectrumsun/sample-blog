import {  Request, Response } from 'express';
import * as argon from 'argon2';
import UserService from '../service/User';

class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const findUser = await UserService.UserExist(req.body.email);
      if(findUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }

      const user = await UserService.createUser(req.body);
      return res.status(201).json({
        success: true,
        message: 'User created',
        data: user
      });
    } catch(error) {
      return res.status(500).json({
        success: false,
        message: 'Email already exist',
        data: error
      });
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const findUser = await UserService.UserExist(req.body.email);
      const verifyPassword = await argon.verify(findUser!.password, req.body.password);      
      if(!verifyPassword) { 
        return res.status(400).json({
          success: false,
          message: 'Email or password not correct',
        })
      };

      const addToken = await UserService.signToken(
        findUser!.id, 
        findUser!.email, 
        findUser!.role.name
      );
      
      return res.status(200).json({
        success: true,
        message: 'User found',
        data: {
          id: findUser?.id,
          email: findUser?.email,
          role: findUser?.role.name,
          token: addToken
        }
      })
    } catch(error) {
        return res.status(500).json({
          success: false,
          message: 'User not found',
          error
      })
    }
  }

  // static async logout(req: Request, res: Response) {
  //   const ooken = await  jwt.
  // }
};

export default UserController;
