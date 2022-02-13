import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET_KEY,
  envChecker,
  ForbiddenError,
  TokenPayload,
  Tokens
} from '@bakinun/common';

import { User } from 'models/user';
import { ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET_KEY } from 'config';

export class RefreshTokenService {
  async refreshToken(refreshToken: string): Promise<Tokens | void> {
    let jwtPayload: TokenPayload;

    try {
      jwtPayload = jwt.verify(
        refreshToken,
        envChecker(process.env, REFRESH_TOKEN_SECRET_KEY)
      ) as TokenPayload;
    } catch (e) {
      throw new ForbiddenError(
        'Refresh token was expired. Please make a new sign in request'
      );
    }

    const user = await User.findOne({
      email: jwtPayload.email,
      refreshToken: refreshToken
    });

    if (!user) {
      throw new ForbiddenError('Refresh token is not in a database');
    }

    const accessToken = jwt.sign(
      { email: user.email } as TokenPayload,
      envChecker(process.env, ACCESS_TOKEN_SECRET_KEY),
      { expiresIn: ACCESS_TOKEN_LIFE }
    );

    return { accessToken, refreshToken };
  }
}
