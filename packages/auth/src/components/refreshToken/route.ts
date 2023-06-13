import express from 'express';
import { body } from 'express-validator';
import { asyncErrorHandler, validateRequest } from '@bakinun/common';

import { controller } from './controller';

export const url = '/api/users/refreshToken';

const router = express.Router();
router.post(
  url,
  [
    body('refreshToken')
      .not()
      .isEmpty()
      .withMessage('RefreshToken: refresh token is required')
  ],
  validateRequest,
  asyncErrorHandler(controller)
);

export { router as refreshTokenRouter };
