import { Request, Response } from 'express';

import { SignInService } from './service';

export const controller = (request: Request, response: Response): void => {
  const { email, password } = request.body;

  const signInService = new SignInService();
  const tokens = signInService.signIn({ email, password });

  response.cookie('jwt', tokens, { httpOnly: true });
  response.send({ email, ...tokens });
};
