import { Request, Response } from 'express';
import { tokensCookieKey } from '@bakinun/common';

import { UserPayload } from 'models/user';

import { SignInService } from './service';

export const controller = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { email, password } = request.body as UserPayload;

  const signInService = new SignInService();
  const tokens = await signInService.signIn({ email, password });

  response.cookie(tokensCookieKey, tokens, { httpOnly: true });
  response.send({ email, ...tokens });
};
