import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
  User,
  Tokens,
  users,
  TokenPayload
} from '../config';

export class SignUpService {
  signUp(user: Pick<User, 'email' | 'password'>): Tokens {
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

    users.push({ ...user, refreshToken });

    return { accessToken, refreshToken };
  }
}
