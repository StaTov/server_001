import express from 'express';
import { Request, Response } from 'express';
import User from '../models/User';
import { toNewUser } from '../utils/helper';
import { UserNoId } from '../types';


const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    User.find({})
        .then(result => res.status(200).json(result))
        .catch(e => console.log(e));
});

// get user by ID

router.get('/:id', (req: Request, _res: Response) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => console.log(result))
        .catch(e => console.log(e));
});

router.post('/', (req: Request, res: Response) => {

    const userObj = toNewUser(req.body);
    const newUser = new User<UserNoId>(userObj);
    newUser.save()
        .then(savedUser => res.status(201).json(savedUser))
        .catch(e => console.log(e));

});

export default router;