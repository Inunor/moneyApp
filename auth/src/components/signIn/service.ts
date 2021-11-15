import { BadRequestError } from 'errors/bad-request-error';
import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
  TokenPayload,
  Tokens,
  User,
  users
} from '../../config';

export class SignInService {
  signIn(user: Pick<User, 'email' | 'password'>): Tokens | void {
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
      if (user.email === email) {
        user.refreshToken = refreshToken;
      }
    });

    return { accessToken, refreshToken };
  }
}
