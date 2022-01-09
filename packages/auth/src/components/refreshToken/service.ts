import jwt from 'jsonwebtoken';
import {
  ForbiddenError,
  TokenPayload,
  Tokens,
  ACCESS_TOKEN_SECRET
} from '@bakinun/common';

import { User } from 'models/user';
import { ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET } from 'config';

export class RefreshTokenService {
  async refreshToken(refreshToken: string): Promise<Tokens | void> {
    let jwtPayload: TokenPayload;

    try {
      jwtPayload = jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET
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
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_LIFE }
    );

    return { accessToken, refreshToken };
  }
}
