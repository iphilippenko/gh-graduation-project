import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
      throw new Error('unauthorized');
    }

    const decoded = jwt.verify(authorization.split(' ')[1], config.JWT_SECRET);
    if (!decoded.id) throw new Error('unauthorized');

    req.user = decoded;
    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};
