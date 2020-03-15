import { config } from 'dotenv-flow';
import path from 'path';

const root = path.join.bind(this, __dirname);
config({ path: root('../../') });

export default {
  PORT: process.env.PORT || 8080,
  IS_PODUCTION: process.env.NODE_ENV === 'production',
  DB_URL: process.env.DB_URL,
};
