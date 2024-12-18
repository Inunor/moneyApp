import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { Tokens } from 'models/token';

import { NotAuthorizedError } from '../errors/not-authorized-error';
import { ForbiddenError } from '../errors/forbidden-error';

// TODO ACCESS_TOKEN_SECRET maybe wrap verify in another function
export const verify = (
  request: Request,
  _response: Response,
  next: NextFunction,
  ACCESS_TOKEN_SECRET: string
): void => {
  const accessToken = (request.cookies.jwt as Tokens)?.accessToken;

  if (!accessToken) {
    throw new NotAuthorizedError('No access token provided');
  }

  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  } catch (e) {
    throw new ForbiddenError(
      'Access token was expired. Please make a refresh token request'
    );
  }

  next();
};
