import express from 'express';

import { controller } from './controller';

export const url = '/api/users/signOut';

const router = express.Router();
router.post(url, controller);

export { router as signOutRouter };
