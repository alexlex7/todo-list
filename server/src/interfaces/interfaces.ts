import { Request } from 'express';

export interface IUser {
  _id: string;
  email: string;
}
export interface UserRequest extends Request {
  user: IUser;
}
