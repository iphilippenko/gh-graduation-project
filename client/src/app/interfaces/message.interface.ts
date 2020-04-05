import {IUser} from './user.interface';

export interface IMessage {
  _id: string;
  text: string;
  owner: IUser;
  createdAt: Date;
  updatedAt: Date;
}
