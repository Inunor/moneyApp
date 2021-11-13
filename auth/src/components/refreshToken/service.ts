import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TokenPayload,
  Tokens,
  users
} from '../../config';

export class RefreshTokenService {
  refreshToken(refreshToken: string): Tokens | void {
    let jwtPayload: TokenPayload;

    try {
      jwtPayload = jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET
      ) as TokenPayload;
    } catch (e) {
      throw new Error(
        'Refresh token was expired. Please make a new sign in request (403)'
      );
    }

    const user = users.find(
      (user) =>
        user.email === jwtPayload.email && user.refreshToken === refreshToken
    );
    if (!user) {
      throw new Error('No user in database. Cannot get refresh token (403)');
    }

    const accessToken = jwt.sign(
      { email: user.email } as TokenPayload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_LIFE }
    );

    return { accessToken, refreshToken };
  }
}
