import {IUser} from './user.interface';
import {IMessage} from './message.interface';

export interface IChat {
  _id: string;
  name: string;
  users: Array<IUser>;
  messages: Array<IMessage>;
  owner: IUser;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
