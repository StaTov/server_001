import express from 'express';
import { RequestHandler } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById } from '../controllers/user';

const router = express.Router();

// get all users
router.get('/', getAllUsers as RequestHandler);

// get user by ID
router.get('/:id', getUserById as RequestHandler);

// add new User
router.post('/', createUser as RequestHandler);

// delete new User
router.delete('/:id', deleteUser as RequestHandler);


//// export
export default router;