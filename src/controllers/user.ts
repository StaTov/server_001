import { Request, Response } from 'express';
import User from '../models/user';
import { UserNoId } from '../types';
import { toNewUser } from '../utils/helper';

// get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        res.status(500).send('unknow error');
    }
};

// get user by id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).send(error.message);
            return;
        }
        res.status(500).send('unknow error');
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const userObj = toNewUser(req.body);
        const newUser = new User<UserNoId>(userObj);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
            return;
        }
        res.status(500).send('unknow error');
    }
};