import { Request, Response } from 'express';

import { RefreshTokenService } from './service';

export const controller = (request: Request, response: Response): void => {
  const { refreshToken } = request.body;

  const refreshTokenService = new RefreshTokenService();
  const tokens = refreshTokenService.refreshToken(refreshToken);

  response.cookie('jwt', tokens, { httpOnly: true });
  response.send({ ...tokens });
};
