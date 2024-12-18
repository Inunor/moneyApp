import { CustomError, SerializedError } from './custom-error';

export class ForbiddenError extends CustomError {
  statusCode = 403;

  /* istanbul ignore next */
  constructor(override readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ msg: this.message }];
  }
}
