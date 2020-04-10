import {IUser} from './user.interface';
import {IMessage} from './message.interface';

export interface IChat {
  _id: string;
  name: string;
  members: Array<IUser>;
  lastMessage: IMessage | null;
  owners: Array<IUser>;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
