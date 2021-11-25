import { NotAuthorizedError } from '../not-authorized-error';

describe('Not authorized error', () => {
  let error: NotAuthorizedError;

  beforeEach(() => {
    error = new NotAuthorizedError('test');
  });

  it('should have correct status code', () => {
    expect(error.statusCode).toBe(401);
  });

  it('should have correct message', () => {
    expect(error.serializeErrors()).toMatchInlineSnapshot(`
      Array [
        Object {
          "message": "test",
        },
      ]
    `);
  });
});
