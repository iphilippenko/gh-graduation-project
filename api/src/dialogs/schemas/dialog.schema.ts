import { prop, buildSchema } from '@typegoose/typegoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { Message } from 'src/messages/schemas/message.schema';
import { User } from 'src/users/schemas/user.schema';

export enum DialogType {
  private = 'private',
  group = 'group',
  channel = 'channel',
}

export class Dialog {
  @ApiHideProperty()
  _id: string;

  @prop()
  name: string;

  @prop([{ type: Schema.Types.ObjectId, ref: 'User' }])
  owners: User[] | string[];

  @prop([{ type: Schema.Types.ObjectId, ref: 'User' }])
  members: User[] | string[];

  @prop({ enum: ['private', 'group', 'channel'], default: 'private' })
  type: DialogType;

  @prop({ type: Schema.Types.ObjectId, ref: 'Message' })
  lastMessage: Message | string;
}

export const DialogSchema = buildSchema(Dialog, {
  versionKey: false,
  timestamps: true,
});
