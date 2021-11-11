import { ValidationError } from 'express-validator';

import { CustomError, SerializedError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(readonly errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
