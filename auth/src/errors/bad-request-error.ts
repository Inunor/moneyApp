import { CustomError, SerializedError } from './custom-error';

export class BadRequestError extends CustomError {
  override readonly statusCode = 400;

  constructor(override readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  override serializeErrors(): SerializedError[] {
    return [{ message: this.message }];
  }
}
