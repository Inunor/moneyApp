import { CustomError, SerializedError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(override readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ message: this.message }];
  }
}
