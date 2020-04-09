import { prop, buildSchema } from '@typegoose/typegoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export class Message {
  @ApiHideProperty()
  _id: string;

  @prop()
  body: string;

  @prop({ type: Schema.Types.ObjectId, ref: 'Dialog' })
  dialog: string;

  @prop({ type: Schema.Types.ObjectId, ref: 'User' })
  owner: string;

  @prop({ type: Schema.Types.ObjectId, ref: 'User' })
  peopleWhoRead: User[] | string[];
}

export const MessageSchema = buildSchema(Message, {
  versionKey: false,
  timestamps: true,
});
