import express from 'express';
import { body } from 'express-validator';

import { asyncErrorHandler } from 'middlewares/async-error-handler';
import { validateRequest } from 'middlewares/validate-request';

import { controller } from './controller';

export const url = '/api/users/signIn';

const router = express.Router();
router.post(
  url,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage('Password must be between 2 and 20 characters')
  ],
  validateRequest,
  asyncErrorHandler(controller)
);

export { router as signInRouter };