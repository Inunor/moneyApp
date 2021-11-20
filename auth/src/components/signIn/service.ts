import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET
} from '../../config';
import { UserPayload, users } from 'models/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { TokenPayload, Tokens } from 'models/token';

export class SignInService {
  signIn(user: UserPayload): Tokens | void {
    const { email, password } = user;

    const existingUser = users.find((user) => user.email === email);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = existingUser.password === password;
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { email: user.email } as TokenPayload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_LIFE }
    );
    const refreshToken = jwt.sign(
      { email: user.email } as TokenPayload,
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_LIFE }
    );

    users.forEach((user) => {
      /* istanbul ignore else */
      if (user.email === email) {
        user.refreshToken = refreshToken;
      }
    });

    return { accessToken, refreshToken };
  }
}
