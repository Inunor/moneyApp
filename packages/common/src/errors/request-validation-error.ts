import { ValidationError } from 'express-validator';

import { CustomError, SerializedError } from './custom-error';

export class RequestValidationError extends CustomError {
  override statusCode = 400;

  /* istanbul ignore next */
  constructor(readonly errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  override serializeErrors(): SerializedError[] {
    this.errors.forEach((error) => {
      console.log(error); // check error properties type, msg AND location, path, value
    });
    return this.errors.map((error) => {
      return { message: error.msg, field: error.type };
    });
  }
}
