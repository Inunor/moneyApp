import jwt from 'jsonwebtoken';
import {
  BadRequestError,
  envChecker,
  TokenPayload,
  Tokens
} from '@bakinun/common';

import { User, UserPayload } from 'models/user';
import {
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_SECRET_KEY
} from 'config';

export class SignInService {
  async signIn(user: UserPayload): Promise<Tokens | void> {
    const { email, password } = user;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await existingUser.validatePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { email } as TokenPayload,
      envChecker(process.env, ACCESS_TOKEN_SECRET_KEY),
      { expiresIn: ACCESS_TOKEN_LIFE }
    );
    const refreshToken = jwt.sign(
      { email } as TokenPayload,
      envChecker(process.env, REFRESH_TOKEN_SECRET_KEY),
      { expiresIn: REFRESH_TOKEN_LIFE }
    );

    await existingUser.updateOne({
      refreshToken
    });

    return { accessToken, refreshToken };
  }
}
