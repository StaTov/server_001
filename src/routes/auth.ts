import express from 'express';
import { RequestHandler } from 'express';
import { regUser } from '../controllers/auth';


const router = express.Router();

//router.post('/login', () => { });
router.post('/reg', regUser as RequestHandler);

export default router;