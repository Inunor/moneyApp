import express from 'express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';

import { signUpRouter } from './components/signUp/route';
import { signInRouter } from './components/signIn/route';
import { signOutRouter } from './components/signOut/route';
import { refreshTokenRouter } from './components/refreshToken/route';

import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(json());
app.use(cookieParser());

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(refreshTokenRouter);

app.all('*', () => {
  throw new Error('Not found error (404)');
});

app.use(errorHandler);

export default app;
