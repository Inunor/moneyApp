import { signUpHelper } from '__test__/helpers/signUp';

describe('SignUp', () => {
  describe('Success', () => {
    it('should return 201 with valid body', async () => {
      const response = await signUpHelper();

      expect(response.status).toBe(201);
      expect(Object.keys(response.body)).toEqual([
        'email',
        'accessToken',
        'refreshToken'
      ]);
    });

    it('should set a cookie', async () => {
      const response = await signUpHelper();

      const cookie = response.get('Set-Cookie');

      expect(response.status).toBe(201);
      expect(cookie).toBeDefined();
    });
  });

  describe('Failure', () => {
    it('should return 400 with an invalid email', async () => {
      const response = await signUpHelper({ email: 'invalid email' });

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
      const response = await signUpHelper({ password: 'p' });

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
      const response = await signUpHelper({ password: 'test1234' }, true);

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
      const response = await signUpHelper({ email: 'test@test.com' }, true);

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

    it('should return 400 with a duplicate user email', async () => {
      const firstResponse = await signUpHelper();
      const secondResponse = await signUpHelper();

      expect(firstResponse.status).toBe(201);
      expect(secondResponse.status).toBe(400);
      expect(secondResponse.body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [
            Object {
              "message": "Email in use",
            },
          ],
        }
      `);
    });
  });
});
