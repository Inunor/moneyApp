import { JwtPayload } from 'jsonwebtoken';

export const ACCESS_TOKEN_SECRET = 'access_token_secret';
export const ACCESS_TOKEN_LIFE = 120;
export const REFRESH_TOKEN_SECRET = 'refresh_token_secret';
export const REFRESH_TOKEN_LIFE = 86400;

export interface User {
  email: string;
  password: string;
  refreshToken: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload extends JwtPayload {
  email: string;
}

export const users: User[] = [];
