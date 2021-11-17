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

  if (!process.env['JEST_WORKER_ID']) {
    console.error(error);
  }

  response.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};
