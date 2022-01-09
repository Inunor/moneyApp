import jwt from 'jsonwebtoken';
import {
  BadRequestError,
  TokenPayload,
  Tokens,
  ACCESS_TOKEN_SECRET
} from '@bakinun/common';

import { UserPayload, User } from 'models/user';
import {
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET
} from 'config';

export class SignUpService {
  async signUp(userPayload: UserPayload): Promise<Tokens> {
    const existingUser = await User.exists({ email: userPayload.email });
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const accessToken = jwt.sign(
      { email: userPayload.email } as TokenPayload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_LIFE }
    );
    const refreshToken = jwt.sign(
      { email: userPayload.email } as TokenPayload,
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_LIFE }
    );

    const user = User.build({ ...userPayload, refreshToken });
    await user.save();

    return { accessToken, refreshToken };
  }
}
