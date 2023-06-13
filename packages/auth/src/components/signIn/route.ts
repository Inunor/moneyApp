import express from 'express';
import { body } from 'express-validator';
import { asyncErrorHandler, validateRequest } from '@bakinun/common';

import { controller } from './controller';

export const url = '/api/users/signIn';

const router = express.Router();
router.post(
  url,
  [
    body('email').isEmail().withMessage('SignIn: email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage('SignIn: password must be between 2 and 20 characters')
  ],
  validateRequest,
  asyncErrorHandler(controller)
);

export { router as signInRouter };
