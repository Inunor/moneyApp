import { Request, Response } from 'express';

import { tokensCookieKey } from 'models/token';

import { RefreshTokenPayload } from './model';
import { RefreshTokenService } from './service';

export const controller = (request: Request, response: Response): void => {
  const { refreshToken } = request.body as RefreshTokenPayload;

  const refreshTokenService = new RefreshTokenService();
  const tokens = refreshTokenService.refreshToken(refreshToken);

  response.cookie(tokensCookieKey, tokens, { httpOnly: true });
  response.send({ ...tokens });
};
