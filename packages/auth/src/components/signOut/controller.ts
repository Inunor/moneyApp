import { Request, Response } from 'express';
import { tokensCookieKey } from '@bakinun/common';

export const controller = (_: Request, response: Response): void => {
  response.clearCookie(tokensCookieKey);
  response.send({});
};
