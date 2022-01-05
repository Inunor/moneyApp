import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '@bakinun/common';

export const validateRequest = (
  request: Request,
  _: Response,
  next: NextFunction
): void => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
