import { Request, Response } from 'express';

import { SignUpService } from './service';

export const controller = (request: Request, response: Response): void => {
  const { email, password } = request.body;

  if (!email || !password) {
    response.sendStatus(400);
  }

  const signUpService = new SignUpService();
  const tokens = signUpService.signUp({ email, password });

  response.cookie('jwt', tokens, { httpOnly: true, secure: true });
  response.status(201).send({ email, ...tokens });
};
