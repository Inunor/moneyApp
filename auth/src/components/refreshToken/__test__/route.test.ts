import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '../../../app';
import { url } from '../route';
import { url as signUpUrl } from '../../signUp/route';
import { url as signInUrl } from '../../signIn/route';
import { REFRESH_TOKEN_SECRET } from 'config';
import { UserPayload } from 'models/user';
import { TokenPayload } from 'models/token';
import { RefreshTokenPayload } from '../model';

describe('RefreshToken', () => {
  describe('Success', () => {
    it('should return 200 with valid body', async () => {
      await request(app)
        .post(signUpUrl)
        .send({
          email: 'test@test.com',
          password: 'test1234'
        } as UserPayload);

      const signInResponse = await request(app)
        .post(signInUrl)
        .send({
          email: 'test@test.com',
          password: 'test1234'
        } as UserPayload);

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
        await request(app)
          .post(signUpUrl)
          .send({
            email: 'test@test.com',
            password: 'test1234'
          } as UserPayload);

        await request(app)
          .post(signInUrl)
          .send({
            email: 'test@test.com',
            password: 'anotherPassword'
          } as UserPayload);

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
        await request(app)
          .post(signUpUrl)
          .send({
            email: 'test@test.com',
            password: 'test1234'
          } as UserPayload);

        await request(app)
          .post(signInUrl)
          .send({
            email: 'test@test.com',
            password: 'test1234'
          } as UserPayload);

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
