import { Request, Response } from 'express';
import { tokensCookieKey } from '@bakinun/common';

import { UserPayload } from 'models/user';

import { SignUpService } from './service';

export const controller = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { email, password } = request.body as UserPayload;

  const signUpService = new SignUpService();
  const tokens = await signUpService.signUp({ email, password });

  response.cookie(tokensCookieKey, tokens, { httpOnly: true });
  response.status(201).send({ email, ...tokens });
};
