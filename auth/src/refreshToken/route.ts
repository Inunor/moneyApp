import express from 'express';

import { controller } from './controller';

const router = express.Router();
router.post('/api/users/refreshToken', controller);

export { router as refreshTokenRouter };
