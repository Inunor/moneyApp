import { Request, Response } from 'express';

import { tokensCookieKey } from 'models/token';
import { UserPayload } from 'models/user';
import { SignUpService } from './service';

export const controller = (request: Request, response: Response): void => {
  const { email, password } = request.body as UserPayload;

  const signUpService = new SignUpService();
  const tokens = signUpService.signUp({ email, password });

  response.cookie(tokensCookieKey, tokens, { httpOnly: true });
  response.status(201).send({ email, ...tokens });
};
