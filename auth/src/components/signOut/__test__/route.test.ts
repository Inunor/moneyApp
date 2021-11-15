import request from 'supertest';

import { url } from '../route';
import { url as signUpUrl } from '../../signUp/route';
import app from '../../../app';

describe('SignOut', () => {
  it('should clear the cookie', async () => {
    const signUpResponse = await request(app).post(signUpUrl).send({
      email: 'test@test.com',
      password: 'test1234'
    });

    const signOutResponse = await request(app).post(url).send();

    expect(signUpResponse.status).toBe(201);
    expect(signOutResponse.status).toBe(200);
    expect(signOutResponse.get('Set-Cookie')).toMatchInlineSnapshot(`
      Array [
        "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      ]
    `);
  });
});
