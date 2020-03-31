import { prop, buildSchema } from '@typegoose/typegoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

export enum DialogType {
  'private',
  'group',
  'channel',
}

export class Dialog {
  @ApiHideProperty()
  _id: string;

  @prop([{ type: Schema.Types.ObjectId, ref: 'User' }])
  owners: string[];

  @prop([{ type: Schema.Types.ObjectId, ref: 'User' }])
  members: string[];

  @prop({ enum: ['private', 'group', 'channel'], default: 'private' })
  type: DialogType;
}

export const DialogSchema = buildSchema(Dialog, {
  versionKey: false,
  timestamps: true,
});
