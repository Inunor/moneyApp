import { NextFunction, Request, Response } from 'express';

export const asyncErrorHandler =
  (
    routeHandler: (
      request: Request,
      response: Response,
      next: NextFunction
    ) => unknown
  ) =>
  (request: Request, response: Response, next: NextFunction): unknown => {
    return Promise.resolve(routeHandler(request, response, next)).catch(next);
  };
