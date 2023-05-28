import request from 'supertest';

import app from '../app';

describe('App', () => {
  it('should throw not found error', async () => {
    const url = '/non-existing-route';

    const response = await request(app).post(url).send();

    expect(response.status).toBe(404);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "message": "Route not found",
          },
        ],
      }
    `);
  });
});
