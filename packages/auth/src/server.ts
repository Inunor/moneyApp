/* istanbul ignore file */
import { connect } from 'mongoose';

import app from './app';

const start = async () => {
  const mongoUri = 'mongodb://localhost:27017/auth';
  try {
    await connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }

  const port = 3000;
  app.listen(port, () => {
    console.log('Listening on port: ' + port);
  });
};

start();
