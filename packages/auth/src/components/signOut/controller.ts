import { Request, Response } from 'express';

import { tokensCookieKey } from 'models/token';

export const controller = (_: Request, response: Response): void => {
  response.clearCookie(tokensCookieKey);
  response.send({});
};
