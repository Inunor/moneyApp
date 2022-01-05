import jwt from 'jsonwebtoken';
import request from 'supertest';

import { REFRESH_TOKEN_SECRET } from 'config';
import { TokenPayload } from 'models/token';
import { signUpHelper } from '__test__/helpers/signUp';
import { signInHelper } from '__test__/helpers/signIn';

import { RefreshTokenPayload } from '../model';
import { url } from '../route';
import app from '../../../app';

describe('RefreshToken', () => {
  describe('Success', () => {
    it('should return 200 with valid body', async () => {
      await signUpHelper();
      const signInResponse = await signInHelper();

      const refreshTokenResponse = await request(app)
        .post(url)
        .send({
          refreshToken: signInResponse.body.refreshToken
        } as RefreshTokenPayload);

      expect(refreshTokenResponse.status).toBe(200);
      expect(refreshTokenResponse.get('Set-Cookie')).toBeDefined();
      expect(Object.keys(refreshTokenResponse.body)).toEqual([
        'accessToken',
        'refreshToken'
      ]);
    });
  });

  describe('Failure', () => {
    it('should return 400 with token absence', async () => {
      const response = await request(app).post(url).send();

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "field": "refreshToken",
              "message": "Refresh token is required",
            },
          ],
        }
      `);
    });

    it('should return 403 with expired token', async () => {
      const refreshToken = jwt.sign(
        { email: 'test@test.com' } as TokenPayload,
        REFRESH_TOKEN_SECRET,
        { expiresIn: 0 }
      );

      const response = await request(app)
        .post(url)
        .send({
          refreshToken
        } as RefreshTokenPayload);

      expect(response.status).toBe(403);
      expect(response.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "message": "Refresh token was expired. Please make a new sign in request",
            },
          ],
        }
      `);
    });

    describe('should return 403 with refresh token absence in a database', () => {
      it('incorrect email', async () => {
        await signUpHelper();
        await signInHelper({ password: 'anotherPassword' });

        const refreshToken = jwt.sign(
          { email: 'anotherTest@test.com' } as TokenPayload,
          REFRESH_TOKEN_SECRET,
          { expiresIn: 60 }
        );

        const response = await request(app)
          .post(url)
          .send({
            refreshToken
          } as RefreshTokenPayload);

        expect(response.status).toBe(403);
        expect(response.body).toMatchInlineSnapshot(`
          Object {
            "errors": Array [
              Object {
                "message": "Refresh token is not in a database",
              },
            ],
          }
        `);
      });

      it('incorrect refresh token', async () => {
        await signUpHelper();
        await signInHelper();

        const refreshToken = jwt.sign(
          { email: 'test@test.com' } as TokenPayload,
          REFRESH_TOKEN_SECRET,
          { expiresIn: 60 }
        );

        const response = await request(app)
          .post(url)
          .send({
            refreshToken
          } as RefreshTokenPayload);

        expect(response.status).toBe(403);
        expect(response.body).toMatchInlineSnapshot(`
          Object {
            "errors": Array [
              Object {
                "message": "Refresh token is not in a database",
              },
            ],
          }
        `);
      });
    });
  });
});