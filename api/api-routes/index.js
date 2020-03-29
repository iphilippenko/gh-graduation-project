import file from './file';
import user from './user';

const prefix = '/api/v1/';

export default app => {
  app.use(`${prefix}file`, file);
  app.use(`${prefix}user`, user);
};
