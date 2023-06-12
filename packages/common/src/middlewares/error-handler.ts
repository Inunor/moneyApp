import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  if (error instanceof CustomError) {
    response.status(error.statusCode).send({
      errors: error.serializeErrors()
    });
    return;
  }

  response.status(400).send({
    errors: [{ msg: 'Something went wrong' }]
  });
};
