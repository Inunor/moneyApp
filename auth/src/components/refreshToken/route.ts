import express from 'express';
import { body } from 'express-validator';

import { validateRequest } from 'middlewares/validate-request';

import { controller } from './controller';

export const url = '/api/users/refreshToken';

const router = express.Router();
router.post(
  url,
  [
    body('refreshToken')
      .not()
      .isEmpty()
      .withMessage('Refresh token is required')
  ],
  validateRequest,
  controller
);

export { router as refreshTokenRouter };
