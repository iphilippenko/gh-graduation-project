import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Container } from 'typedi';

const userService = Container.get('userService');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
    },
    (userName, password, done) => {
      userService
        .findOne({ userName })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { 'username or password': 'is invalid' },
            });
          }
          return done(null, user);
        })
        .catch(done);
    },
  ),
);
