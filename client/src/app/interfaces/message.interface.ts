import {IUser} from './user.interface';

export interface IMessage {
  _id: string;
  body: string;
  owner: IUser;
  createdAt: Date;
  updatedAt: Date;
}
