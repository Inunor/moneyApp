import express from 'express';

import { controller } from './controller';

const router = express.Router();
router.post('/api/users/signOut', controller);

export { router as signOutRouter };
