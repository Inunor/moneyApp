import { Request, Response } from 'express';

export const controller = (_: Request, response: Response): void => {
  response.clearCookie('jwt');
  response.send({});
};
