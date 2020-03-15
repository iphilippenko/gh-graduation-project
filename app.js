import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import config from './api/config';

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

(async () => {
  await require('./api/loaders').default();
  require('./api/middlewares/passport');
  require('./api/api-routes').default(app);

  app.use(require('./api/middlewares/errorHandler').errorHandler);

  if (!config.IS_PODUCTION) {
    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(require('./swagger.json')),
    );
  }

  app.listen(config.PORT, () => {
    console.log(`Server listen on port: ${config.PORT}`);
  });
})();
