import { CustomError, SerializedError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  /* istanbul ignore next */
  constructor(override readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ msg: this.message }];
  }
}
