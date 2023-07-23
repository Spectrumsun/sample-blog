import {JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface userDto {
  email: string 
  name: string
  password: string
  roleId: string
  id?: string
}

export interface Role {
  name: string
}

export enum RolesEnum { 
  ADMIN = 'ADMIN', 
  USER = 'USER'
}

export interface postDto {
  title:  string
  content: string
  authorId?: String
  id?: string
}

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}
