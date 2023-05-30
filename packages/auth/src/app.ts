import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler, NotFoundError } from '@bakinun/common';

import { signUpRouter } from './components/signUp/route';
import { signInRouter } from './components/signIn/route';
import { signOutRouter } from './components/signOut/route';
import { refreshTokenRouter } from './components/refreshToken/route';

const app = express();

// TODO add { secure } flag to res.cookie methods (false for dev, true for prod), trust-proxy

app.use(express.json());
app.use(cookieParser());

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(refreshTokenRouter);

app.all('*', () => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler);

export default app;
