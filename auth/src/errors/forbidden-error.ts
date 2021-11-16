import { CustomError, SerializedError } from './custom-error';

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(override readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ message: this.message }];
  }
}
