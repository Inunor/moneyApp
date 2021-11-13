import { Request, Response } from 'express';

import { Tokens } from 'config';
import { RefreshTokenService } from './service';

export const controller = (request: Request, response: Response): void => {
  const refreshToken = (request.cookies.jwt as Tokens).refreshToken;

  if (!refreshToken) {
    response.status(403).json('Refresh token is required');
    return;
  }

  const refreshTokenService = new RefreshTokenService();
  const tokens = refreshTokenService.refreshToken(refreshToken);

  response.cookie('jwt', tokens, { httpOnly: true });
  response.send({ tokens });
};
