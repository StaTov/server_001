import express from 'express';
import { RequestHandler } from 'express';
import { login, regUser } from '../controllers/auth';

const router = express.Router();

router.post('/login', login as RequestHandler);
router.post('/reg', regUser as RequestHandler);

export default router;