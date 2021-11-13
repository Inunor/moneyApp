import express from 'express';

import { controller } from './controller';

const router = express.Router();
router.post('/api/users/signIn', controller);

export { router as signInRouter };
