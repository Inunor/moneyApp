import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { NotAuthorizedError } from 'errors/not-authorized-error';
import { ForbiddenError } from 'errors/forbidden-error';
import { TokenPayload, Tokens } from 'models/token';

import { verify } from '../verify';

describe('Verify middleware', () => {
  const ACCESS_TOKEN_SECRET = 'access_token_secret';

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    mockNextFunction = jest.fn();
  });

  describe('Success', () => {
    it('should pass verify process', () => {
      const accessToken = jwt.sign(
        { email: 'test@test.com' } as TokenPayload,
        ACCESS_TOKEN_SECRET,
        { expiresIn: 120 }
      );
      mockRequest = {
        cookies: {
          jwt: { accessToken } as Tokens
        }
      };

      verify(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction,
        ACCESS_TOKEN_SECRET
      );

      expect(mockNextFunction).toHaveBeenCalled();
    });
  });

  describe('Failure', () => {
    it('should return 401 error (no token provided)', () => {
      mockRequest = {
        cookies: {}
      };

      const f = () =>
        verify(
          mockRequest as Request,
          mockResponse as Response,
          mockNextFunction,
          ACCESS_TOKEN_SECRET
        );

      expect(f).toThrow(NotAuthorizedError);
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should return 403 error (expired token)', () => {
      const accessToken = jwt.sign(
        { email: 'test@test.com' } as TokenPayload,
        ACCESS_TOKEN_SECRET,
        { expiresIn: 0 }
      );
      mockRequest = {
        cookies: {
          jwt: { accessToken } as Tokens
        }
      };

      const f = () =>
        verify(
          mockRequest as Request,
          mockResponse as Response,
          mockNextFunction,
          ACCESS_TOKEN_SECRET
        );

      expect(f).toThrow(ForbiddenError);
      expect(mockNextFunction).not.toHaveBeenCalled();
    });
  });
});
