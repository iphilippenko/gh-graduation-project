import { prop, buildSchema } from '@typegoose/typegoose';
import { ApiHideProperty } from '@nestjs/swagger';
import * as _ from 'lodash';
import * as crypto from 'crypto';

export class User {
  @ApiHideProperty()
  _id: string;

  @prop({ unique: true, minlength: 3 })
  userName: string;

  @prop()
  avatar: string;

  @ApiHideProperty()
  @prop()
  salt: string;

  @ApiHideProperty()
  @prop()
  hash: string;

  setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
  }

  checkPassword(password: string) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
    return this.hash === hash ? _.pick(this, ['_id', 'userName']) : null;
  }
}

export const UserSchema = buildSchema(User, {
  versionKey: false,
  timestamps: true,
});
