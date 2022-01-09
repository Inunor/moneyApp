import { Request, Response } from 'express';
import { tokensCookieKey } from '@bakinun/common';

import { RefreshTokenPayload } from './model';
import { RefreshTokenService } from './service';

export const controller = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { refreshToken } = request.body as RefreshTokenPayload;

  const refreshTokenService = new RefreshTokenService();
  const tokens = await refreshTokenService.refreshToken(refreshToken);

  response.cookie(tokensCookieKey, tokens, { httpOnly: true });
  response.send({ ...tokens });
};
