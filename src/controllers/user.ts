import { NextFunction, Request, Response } from 'express';
import { deleteUserById, getUserById, getUsers } from '../models/user';

// get all users
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// get user by id
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        if (!user) {
            res.status(404).send('user not found');
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// delete new user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await deleteUserById(id);
        res.status(200).end();
    } catch (error) {
        next(error);
    }
};