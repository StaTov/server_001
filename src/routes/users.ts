import express from 'express';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import User from '../models/User';
import { toNewUser } from '../utils/helper';
import { UserNoId } from '../types';
import { getAllUsers, getUserById } from '../controllers/user';



const router = express.Router();

// get all users

router.get('/', getAllUsers as RequestHandler);

// get user by ID

router.get('/:id', getUserById as RequestHandler);

// add new User

router.post('/', (req: Request, res: Response, next: NextFunction) => {

    const userObj = toNewUser(req.body);
    const newUser = new User<UserNoId>(userObj);
    newUser.save()
        .then(savedUser =>
            res.status(201).json(savedUser))
        .catch(next);

});

export default router;