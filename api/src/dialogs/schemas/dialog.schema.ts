import { prop, buildSchema, Ref } from '@typegoose/typegoose';
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

  @prop({ ref: 'User' })
  owners: Ref<User>[];

  @prop({ ref: 'User' })
  members: Ref<User>[];

  @prop({ enum: ['private', 'group', 'channel'], default: 'private' })
  type: DialogType;

  @prop({ ref: 'Message' })
  lastMessage: Ref<Message>;
}

export const DialogSchema = buildSchema(Dialog, {
  versionKey: false,
  timestamps: true,
});
