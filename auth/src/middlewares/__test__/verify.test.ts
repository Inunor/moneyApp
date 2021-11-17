import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN_LIFE, ACCESS_TOKEN_SECRET, TokenPayload } from 'config';
import { verify } from '../verify';
import { NotAuthorizedError } from 'errors/not-authorized-error';
import { ForbiddenError } from 'errors/forbidden-error';

describe('Verify', () => {
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
        { expiresIn: ACCESS_TOKEN_LIFE }
      );
      mockRequest = {
        cookies: {
          jwt: { accessToken }
        }
      };

      verify(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction
      );

      expect(mockNextFunction).toHaveBeenCalled();
    });
  });

  describe('Failure', () => {
    it('should return 401 error (no token provided)', () => {
      mockRequest = {
        cookies: {
          jwt: {}
        }
      };

      const f = () =>
        verify(
          mockRequest as Request,
          mockResponse as Response,
          mockNextFunction
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
          jwt: { accessToken }
        }
      };

      const f = () =>
        verify(
          mockRequest as Request,
          mockResponse as Response,
          mockNextFunction
        );

      expect(f).toThrow(ForbiddenError);
      expect(mockNextFunction).not.toHaveBeenCalled();
    });
  });
});
