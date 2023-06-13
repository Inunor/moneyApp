import { ValidationError } from 'express-validator';

export type SerializedError = Pick<ValidationError, 'msg'>;

export abstract class CustomError extends Error {
  abstract statusCode: number;

  /* istanbul ignore next */
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): SerializedError[];
}
