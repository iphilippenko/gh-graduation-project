import file from './file';

const prefix = '/v1/';

export default app => {
  app.use(`${prefix}/file`, file);
};
