import { ValidationError } from 'express-validator';

import { RequestValidationError } from '../request-validation-error';

describe('Request validation error', () => {
  let error: RequestValidationError;

  beforeEach(() => {
    error = new RequestValidationError([
      { msg: 'first_test_msg', param: 'first_test_param' } as ValidationError,
      { msg: 'second_test_msg', param: 'second_test_param' } as ValidationError
    ]);
  });

  it('should have correct status code', () => {
    expect(error.statusCode).toBe(400);
  });

  it('should have correct message', () => {
    expect(error.serializeErrors()).toMatchInlineSnapshot(`
      Array [
        Object {
          "field": "first_test_param",
          "message": "first_test_msg",
        },
        Object {
          "field": "second_test_param",
          "message": "second_test_msg",
        },
      ]
    `);
  });
});
