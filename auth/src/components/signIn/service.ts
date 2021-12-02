import jwt from 'jsonwebtoken';

import { User, UserPayload } from 'models/user';
import { TokenPayload, Tokens } from 'models/token';
import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET
} from 'config';
import { BadRequestError } from 'errors/bad-request-error';

export class SignInService {
  async signIn(user: UserPayload): Promise<Tokens | void> {
    const { email, password } = user;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = existingUser.password === password;
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { email } as TokenPayload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_LIFE }
    );
    const refreshToken = jwt.sign(
      { email } as TokenPayload,
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_LIFE }
    );

    await existingUser.updateOne({
      refreshToken
    });

    return { accessToken, refreshToken };
  }
}
