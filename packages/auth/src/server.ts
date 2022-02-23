/* istanbul ignore file */
import { connect } from 'mongoose';
import {
  envChecker,
  MONGO_PASSWORD_KEY,
  MONGO_URI_KEY,
  MONGO_USERNAME_KEY,
  replaceMongoURICredentials
} from '@bakinun/common';

import app from './app';
import { REFRESH_TOKEN_SECRET_KEY, ACCESS_TOKEN_SECRET_KEY } from './config';

const start = async () => {
  try {
    envChecker(process.env, ACCESS_TOKEN_SECRET_KEY);
    envChecker(process.env, REFRESH_TOKEN_SECRET_KEY);
    const mongoUri = replaceMongoURICredentials(
      envChecker(process.env, MONGO_URI_KEY),
      envChecker(process.env, MONGO_USERNAME_KEY),
      envChecker(process.env, MONGO_PASSWORD_KEY)
    );

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
