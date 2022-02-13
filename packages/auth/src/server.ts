/* istanbul ignore file */
import { connect } from 'mongoose';
import {
  envChecker,
  ACCESS_TOKEN_SECRET_KEY,
  MONGO_URI_KEY
} from '@bakinun/common';

import app from './app';
import { REFRESH_TOKEN_SECRET_KEY } from './config';

const start = async () => {
  try {
    envChecker(process.env, ACCESS_TOKEN_SECRET_KEY);
    envChecker(process.env, REFRESH_TOKEN_SECRET_KEY);
    const mongoUri = envChecker(process.env, MONGO_URI_KEY);

    await connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
    return;
  }

  const port = 3000;
  app.listen(port, () => {
    console.log('Listening on port: ' + port);
  });
};

start();
