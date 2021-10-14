import express from 'express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';

import { signUpRouter } from './signUp/route';

const app = express();

app.use(json());
app.use(cookieParser());

app.use(signUpRouter);

export default app;
