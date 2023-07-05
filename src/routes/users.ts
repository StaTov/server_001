import express from 'express';
import { RequestHandler } from 'express';
import { deleteUser, getAllUsers, getUser } from '../controllers/user';


const router = express.Router();

// get all users
router.get('/', getAllUsers as RequestHandler);

// get user by ID
router.get('/:id', getUser as RequestHandler);

// delete new User
router.delete('/:id', deleteUser as RequestHandler);


//// export
export default router;