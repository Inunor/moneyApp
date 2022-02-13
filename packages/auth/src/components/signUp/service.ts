import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET_KEY,
  BadRequestError,
  envChecker,
  TokenPayload,
  Tokens
} from '@bakinun/common';

import { UserPayload, User } from 'models/user';
import {
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET_KEY
} from 'config';

export class SignUpService {
  async signUp(userPayload: UserPayload): Promise<Tokens> {
    const existingUser = await User.exists({ email: userPayload.email });
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const accessToken = jwt.sign(
      { email: userPayload.email } as TokenPayload,
      envChecker(process.env, ACCESS_TOKEN_SECRET_KEY),
      { expiresIn: ACCESS_TOKEN_LIFE }
    );
    const refreshToken = jwt.sign(
      { email: userPayload.email } as TokenPayload,
      envChecker(process.env, REFRESH_TOKEN_SECRET_KEY),
      { expiresIn: REFRESH_TOKEN_LIFE }
    );

    const user = User.build({ ...userPayload, refreshToken });
    await user.save();

    return { accessToken, refreshToken };
  }
}
