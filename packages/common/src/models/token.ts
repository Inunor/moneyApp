import { JwtPayload } from 'jsonwebtoken';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload extends JwtPayload {
  email: string;
}

/* istanbul ignore next */
export const tokensCookieKey = 'jwt';
