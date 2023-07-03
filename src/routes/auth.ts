import express from 'express';
import { RequestHandler } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById } from '../controllers/user';

const router = express.Router();

router.post('/')