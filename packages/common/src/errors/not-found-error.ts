import { CustomError, SerializedError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  /* istanbul ignore next */
  constructor(override readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ msg: this.message }];
  }
}
