import jwt from 'jsonwebtoken';

import { UserPayload, users, User } from 'models/user';
import { TokenPayload, Tokens } from 'models/token';
import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET
} from 'config';
import { BadRequestError } from 'errors/bad-request-error';

export class SignUpService {
  async signUp(userPayload: UserPayload): Promise<Tokens> {
    const existingUser_ = await User.findOne({ email: userPayload.email });
    const existingUser = users.find((u) => u.email === userPayload.email);
    if (existingUser || existingUser_) {
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

    const user = User.build({ ...userPayload });
    await user.save();
    users.push({ ...userPayload, refreshToken });

    return { accessToken, refreshToken };
  }
}
