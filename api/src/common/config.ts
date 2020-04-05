import { config } from 'dotenv-flow';
import * as path from 'path';

const IS_PODUCTION = process.env.NODE_ENV === 'production';
const root = path.join.bind(this, __dirname);

if (!IS_PODUCTION) config({ path: root('../../../') });

export default {
  PORT: process.env.PORT || 8080,
  IS_PODUCTION: process.env.NODE_ENV === 'production',
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_BUILD_URL: path.resolve(root('../../') + process.env.CLIENT_BUILD_URL),
};
