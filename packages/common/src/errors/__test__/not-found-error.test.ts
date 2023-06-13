import { NotFoundError } from '../not-found-error';

describe('Not found error', () => {
  let error: NotFoundError;

  beforeEach(() => {
    error = new NotFoundError('test');
  });

  it('should have correct status code', () => {
    expect(error.statusCode).toBe(404);
  });

  it('should have correct message', () => {
    expect(error.serializeErrors()).toMatchInlineSnapshot(`
      [
        {
          "msg": "test",
        },
      ]
    `);
  });
});
