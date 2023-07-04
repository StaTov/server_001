import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';

// get all users
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find({});

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// get user by id
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
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
        await UserModel.findByIdAndDelete(id);
        res.status(200).end();
    } catch (error) {
        next(error);
    }
};