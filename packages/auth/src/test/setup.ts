import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MONGO_URI_KEY } from '@bakinun/common';

import { REFRESH_TOKEN_SECRET_KEY, ACCESS_TOKEN_SECRET_KEY } from '../config';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env[ACCESS_TOKEN_SECRET_KEY] = 'access_token_secret_test';
  process.env[REFRESH_TOKEN_SECRET_KEY] = 'refresh_token_secret_test';
  process.env[MONGO_URI_KEY] = 'mongo_uri_test';

  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});
