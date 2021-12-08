import { NextFunction, Request, Response } from 'express';

import { tokensCookieKey } from 'models/token';
import { UserPayload } from 'models/user';

import { SignInService } from './service';

export const controller = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = request.body as UserPayload;

    const signInService = new SignInService();
    const tokens = await signInService.signIn({ email, password });

    response.cookie(tokensCookieKey, tokens, { httpOnly: true });
    response.send({ email, ...tokens });
  } catch (e) {
    next(e);
  }
};
