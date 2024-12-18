import { Request, Response, NextFunction } from 'express';

import { NotFoundError } from 'errors/not-found-error';

import { errorHandler } from '../error-handler';

describe('Error handler middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse as Response),
      send: jest.fn()
    };
    mockNextFunction = jest.fn();
  });

  it('should handle custom error', () => {
    const notFoundText = 'Test custom error';
    const notFoundError = new NotFoundError(notFoundText);

    errorHandler(
      notFoundError,
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(notFoundError.statusCode);
    expect(mockResponse.send).toHaveBeenCalledWith({
      errors: [{ msg: notFoundText }]
    });
  });

  it('should handle default errors', () => {
    const defaultError = new Error('Test default error');

    errorHandler(
      defaultError,
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith({
      errors: [{ msg: 'Something went wrong' }]
    });
  });
});
