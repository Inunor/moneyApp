export const ACCESS_TOKEN_SECRET = 'access_token_secret';
export const ACCESS_TOKEN_LIFE = 120;
export const REFRESH_TOKEN_SECRET = 'refresh_token_secret';
export const REFRESh_TOKEN_LIFE = 86400;

export interface User {
  email: string;
  password: string;
  refreshToken: string;
}

export const users: User[] = [];
