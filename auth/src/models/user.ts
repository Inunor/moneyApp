export interface UserPayload {
  email: string;
  password: string;
}

export interface User extends UserPayload {
  refreshToken: string;
}

export const users: User[] = [];
