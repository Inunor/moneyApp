import { BadRequestError } from '../bad-request-error';

describe('Bad request error', () => {
  let error: BadRequestError;

  beforeEach(() => {
    error = new BadRequestError('test');
  });

  it('should have correct status code', () => {
    expect(error.statusCode).toBe(400);
  });

  it('should have correct message', () => {
    expect(error.serializeErrors()).toMatchInlineSnapshot(`
      [
        {
          "message": "test",
        },
      ]
    `);
  });
});
