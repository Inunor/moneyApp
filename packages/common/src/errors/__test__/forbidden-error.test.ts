import { ForbiddenError } from '../forbidden-error';

describe('Forbidden error', () => {
  let error: ForbiddenError;

  beforeEach(() => {
    error = new ForbiddenError('test');
  });

  it('should have correct status code', () => {
    expect(error.statusCode).toBe(403);
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
