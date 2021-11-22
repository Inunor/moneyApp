import request from 'supertest';

import { url } from '../route';
import app from '../../../app';
import { UserPayload } from 'models/user';
import { signUpHelper } from '__test__/helpers/signUp';

describe('SignIn', () => {
  describe('Success', () => {
    const successHelper = async () => {
      const signUpResponse = await signUpHelper();

      const signInResponse = await request(app)
        .post(url)
        .send({
          email: 'test@test.com',
          password: 'test1234'
        } as UserPayload);

      return { signInResponse, signUpResponse };
    };

    it('should return 200 with valid body', async () => {
      const { signInResponse, signUpResponse } = await successHelper();

      expect(signUpResponse.status).toBe(201);
      expect(signInResponse.status).toBe(200);
      expect(Object.keys(signInResponse.body)).toEqual([
        'email',
        'accessToken',
        'refreshToken'
      ]);
    });

    it('should set a cookie', async () => {
      const { signInResponse } = await successHelper();

      const cookie = signInResponse.get('Set-Cookie');

      expect(signInResponse.status).toBe(200);
      expect(cookie).toBeDefined();
    });
  });

  describe('Failure', () => {
    it('should return 400 with an invalid email', async () => {
      const response = await request(app)
        .post(url)
        .send({
          email: 'test',
          password: 'test1234'
        } as UserPayload);

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "field": "email",
              "message": "Email must be valid",
            },
          ],
        }
      `);
    });

    it('should return 400 with an invalid password', async () => {
      const response = await request(app)
        .post(url)
        .send({
          email: 'test@test.com',
          password: 't'
        } as UserPayload);

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "field": "password",
              "message": "Password must be between 2 and 20 characters",
            },
          ],
        }
      `);
    });

    it('should return 400 with a missing email', async () => {
      const response = await request(app).post(url).send({
        password: 'test1234'
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "field": "email",
              "message": "Email must be valid",
            },
          ],
        }
      `);
    });

    it('should return 400 with a missing password', async () => {
      const response = await request(app)
        .post(url)
        .send({
          email: 'test@.test.com'
        } as UserPayload);

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "field": "email",
              "message": "Email must be valid",
            },
            Object {
              "field": "password",
              "message": "Password must be between 2 and 20 characters",
            },
          ],
        }
      `);
    });

    it('should return 400 user mismatch', async () => {
      const signUpResponse = await signUpHelper();

      const signInResponse = await request(app)
        .post(url)
        .send({
          email: 'anotherTest@test.com',
          password: 'test1234'
        } as UserPayload);

      expect(signUpResponse.status).toBe(201);
      expect(signInResponse.status).toBe(400);
      expect(signInResponse.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "message": "Invalid credentials",
            },
          ],
        }
      `);
    });

    it('should return 400 password mismatch', async () => {
      const signUpResponse = await signUpHelper();

      const signInResponse = await request(app)
        .post(url)
        .send({
          email: 'test@test.com',
          password: 'anotherTest1234'
        } as UserPayload);

      expect(signUpResponse.status).toBe(201);
      expect(signInResponse.status).toBe(400);
      expect(signInResponse.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "message": "Invalid credentials",
            },
          ],
        }
      `);
    });
  });
});
