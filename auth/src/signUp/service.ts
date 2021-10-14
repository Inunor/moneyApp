import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESh_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
  User,
  users
} from '../config';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class SignUpService {
  signUp(user: Pick<User, 'email' | 'password'>): Tokens {
    const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_LIFE
    });
    const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESh_TOKEN_LIFE
    });

    users.push({ ...user, refreshToken });

    return { accessToken, refreshToken };
  }
}
