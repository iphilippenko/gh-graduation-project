import mongoose from 'mongoose';
import config from '../config';

mongoose
  .connect(config.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Successfully connected to DB!'))
  .catch(err => console.error('Error connect to DB', err));
