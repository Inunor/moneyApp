import express from 'express';
import { body } from 'express-validator';

import { controller } from './controller';
import { validateRequest } from '../../middlewares/validate-request';

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
