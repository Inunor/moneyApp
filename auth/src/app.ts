import express from 'express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';

import { signUpRouter } from './signUp/route';
import { signInRouter } from './signIn/route';
import { signOutRouter } from './signOut/route';
import { refreshTokenRouter } from './refreshToken/route';

const app = express();

app.use(json());
app.use(cookieParser());

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(refreshTokenRouter);

export default app;
