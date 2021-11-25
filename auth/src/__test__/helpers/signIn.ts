import request, { Response } from 'supertest';

import { UserPayload } from 'models/user';

import app from '../../app';
import { url } from '../../components/signIn/route';

export const signInHelper = async (
  payload?: Partial<UserPayload>,
  completelyOverride = false
): Promise<Response> => {
  return await request(app)
    .post(url)
    .send(
      completelyOverride
        ? payload
        : ({
            email: 'test@test.com',
            password: 'test1234',
            ...payload
          } as UserPayload)
    );
};
