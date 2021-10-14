import express from 'express';

import { controller } from './controller';

const router = express.Router();
router.post('/api/users/signUp', controller);

export { router as signUpRouter };
