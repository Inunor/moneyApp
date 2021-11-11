import express from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { controller } from './controller';

const router = express.Router();
router.post(
  '/api/users/signUp',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage('Password must be between 2 and 20 characters')
  ],
  validateRequest,
  controller
);

export { router as signUpRouter };
