import { Router } from 'express';
import passport from 'passport';
import { Container } from 'typedi';
import { auth, catchError, validate } from '../middlewares';
import { createUser } from '../validators';

const router = new Router();
const userService = Container.get('userService');

router.get('/info', auth, async (req, res) => {
  if (!req.user || !req.user.id) return res.json(null);

  const { id } = req.user;
  const user = await userService.findOne({ _id: id });
  const userInfo = user.getUserInfo();
  res.json(userInfo);
});

router.post('/login', (req, res, next) => {
  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'Username or password incorrect' });
      }
      if (passportUser) {
        return res.json({
          ...passportUser.getUserInfo(),
          token: passportUser.generateJWT(),
        });
      }
      return res.status(400).json({ info });
    },
  )(req, res, next);
});

router.post(
  '/register',
  validate(createUser),
  catchError(async (req, res) => {
    const { password, ...rest } = req.body;

    const user = await userService.create({ ...rest });
    user.setPassword(password);
    await user.save();

    res.json(user);
  }),
);

export default router;
