import { JwtPayload } from 'jsonwebtoken';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload extends JwtPayload {
  email: string;
}
