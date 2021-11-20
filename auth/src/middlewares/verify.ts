import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN_SECRET } from 'config';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { Tokens } from 'models/token';

export const verify = (
  request: Request,
  _response: Response,
  next: NextFunction
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
