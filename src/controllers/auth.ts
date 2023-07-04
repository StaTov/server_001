import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';
import { AppError } from '../utils/middleware';
import { checkLoginData, checkUserData } from '../utils/narrowing';
import bcrypt from 'bcryptjs';

export const regUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password } = checkUserData(req.body);

        const existUsername = await UserModel.findOne({ username });
        const existEmail = await UserModel.findOne({ email });

        if (existUsername) {
            throw new AppError(400, 'this username alrady exist');
        }
        if (existEmail) {
            throw new AppError(400, 'this email alrady exist');
        }
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        //create new user
        const newUser = new UserModel({
            email,
            username,
            auth: {
                password: passwordHash,
            },
            role: ['guest']
        });
        //save and send
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (e) {
        next(e);
    }
};

export const login = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const { email, password } = checkLoginData(req.body);
        const existUser = await UserModel.findOne({ email });

        if (!existUser) {
            throw new AppError(400, 'this email is not registered ');
        }
        bcrypt.compareSync(password, existUser.auth.password);

    } catch (e) {
        next(e);
    }
};