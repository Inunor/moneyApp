import { signUpHelper } from '__test__/helpers/signUp';
import { signInHelper } from '__test__/helpers/signIn';

describe('SignIn', () => {
  describe('Success', () => {
    const successHelper = async () => {
      const signUpResponse = await signUpHelper();
      const signInResponse = await signInHelper();

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
      const response = await signInHelper({ email: 'tets' });

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        {
          "errors": [
            {
              "msg": "SignIn: email must be valid",
            },
          ],
        }
      `);
    });

    it('should return 400 with an invalid password', async () => {
      const response = await signInHelper({ password: 'p' });

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        {
          "errors": [
            {
              "msg": "SignIn: password must be between 2 and 20 characters",
            },
          ],
        }
      `);
    });

    it('should return 400 with a missing email', async () => {
      const response = await signInHelper({ password: 'test1234' }, true);

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        {
          "errors": [
            {
              "msg": "SignIn: email must be valid",
            },
          ],
        }
      `);
    });

    it('should return 400 with a missing password', async () => {
      const response = await signInHelper({ email: 'test@test.com' }, true);

      expect(response.status).toBe(400);
      expect(response.body).toMatchInlineSnapshot(`
        {
          "errors": [
            {
              "msg": "SignIn: password must be between 2 and 20 characters",
            },
          ],
        }
      `);
    });

    it('should return 400 user mismatch', async () => {
      const signUpResponse = await signUpHelper();
      const signInResponse = await signInHelper({
        email: 'anotherTest@test.com'
      });

      expect(signUpResponse.status).toBe(201);
      expect(signInResponse.status).toBe(400);
      expect(signInResponse.body).toMatchInlineSnapshot(`
        {
          "errors": [
            {
              "msg": "Invalid credentials",
            },
          ],
        }
      `);
    });

    it('should return 400 password mismatch', async () => {
      const signUpResponse = await signUpHelper();
      const signInResponse = await signInHelper({
        password: 'anotherTest1234'
      });

      expect(signUpResponse.status).toBe(201);
      expect(signInResponse.status).toBe(400);
      expect(signInResponse.body).toMatchInlineSnapshot(`
        {
          "errors": [
            {
              "msg": "Invalid credentials",
            },
          ],
        }
      `);
    });
  });
});
