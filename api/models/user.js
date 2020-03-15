import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import config from '../config';

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      minlength: 3,
    },
    avatar: {
      type: String,
      required: true,
    },
    hash: String,
    salt: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jwt.sign(
    {
      id: this._id,
      userName: this.userName,
    },
    config.JWT_SECRET,
  );
};

UserSchema.methods.getUserInfo = function() {
  const userInfo = _.omit({ ...this._doc }, ['hash', 'salt']);
  return userInfo;
};

export default model('User', UserSchema);
