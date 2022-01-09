import { NextFunction, Request, Response } from 'express';

import { asyncErrorHandler } from '../async-error-handler';

describe('Async error handler middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    mockNextFunction = jest.fn();
  });

  const helper = async (fnPromise: Promise<unknown>) => {
    const fn = async (
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<void> => {
      request;
      response;
      next;
      await fnPromise;
    };

    await asyncErrorHandler(fn)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
  };

  it('should call async error handler', async () => {
    const error = new Error('Async error');
    const fnPromise = new Promise(() => {
      throw error;
    });

    await helper(fnPromise);

    expect(mockNextFunction).toBeCalledWith(error);
  });

  it('should not call async error handler', async () => {
    const fnPromise = new Promise((resolve) => {
      resolve('Success');
    });

    await helper(fnPromise);

    expect(mockNextFunction).not.toBeCalled();
  });
});
