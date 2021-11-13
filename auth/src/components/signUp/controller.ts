import { Request, Response } from 'express';

import { SignUpService } from './service';

export const controller = (request: Request, response: Response): void => {
  const { email, password } = request.body;

  const signUpService = new SignUpService();
  const tokens = signUpService.signUp({ email, password });

  response.cookie('jwt', tokens, { httpOnly: true });
  response.status(201).send({ email, ...tokens });
};
