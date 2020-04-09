import { UnauthorizedException } from '@nestjs/common';
import * as jwtAuth from 'socketio-jwt-auth';
import config from 'src/common/config';

export const AuthSocket = jwtAuth.authenticate(
  {
    secret: config.JWT_SECRET,
    algorithm: 'HS256',
  },
  (user, done) => {
    if (!user._id) done(new UnauthorizedException());
    else return done(undefined, user);
  },
);
