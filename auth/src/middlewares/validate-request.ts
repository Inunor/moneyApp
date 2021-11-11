import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';

export function validateRequest(
  request: Request,
  _: Response,
  next: NextFunction
): void {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
}
