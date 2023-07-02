import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { UserNoId } from '../types';
import { toNewUser } from '../utils/narrowing';

// get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Cookies: ', req.cookies);
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// get user by id
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send('user not found');
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// create new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userObj = toNewUser(req.body);
        const newUser = new User<UserNoId>(userObj);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};