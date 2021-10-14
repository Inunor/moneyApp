import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESh_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
  Tokens,
  User,
  users
} from '../config';

export class SignInService {
  signIn(user: Pick<User, 'email' | 'password'>): Tokens | void {
    const { email, password } = user;

    const existingUser = users.find((user) => user.email === email);
    if (!existingUser) {
      return;
    }

    const passwordsMatch = existingUser.password === password;
    if (!passwordsMatch) {
      return;
    }

    const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_LIFE
    });
    const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESh_TOKEN_LIFE
    });

    return { accessToken, refreshToken };
  }
}
