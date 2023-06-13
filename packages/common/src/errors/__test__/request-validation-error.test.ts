import { ValidationError } from 'express-validator';

import { RequestValidationError } from '../request-validation-error';

describe('Request validation error', () => {
  let error: RequestValidationError;

  beforeEach(() => {
    error = new RequestValidationError([
      { msg: 'first_test_msg' } as ValidationError,
      { msg: 'second_test_msg' } as ValidationError
    ]);
  });

  it('should have correct status code', () => {
    expect(error.statusCode).toBe(400);
  });

  it('should have correct message', () => {
    expect(error.serializeErrors()).toMatchInlineSnapshot(`
      [
        {
          "msg": "first_test_msg",
        },
        {
          "msg": "second_test_msg",
        },
      ]
    `);
  });
});
