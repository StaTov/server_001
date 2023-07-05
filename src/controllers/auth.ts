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

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = checkLoginData(req.body);
        const user = await UserModel.findOne({ email }).select('+auth.password');
       
        if (!user) {
            throw new AppError(400, 'this email is not registered ');
        }

        const existPassword = bcrypt.compareSync(password, user.auth.password);

        if (!existPassword) {
            throw new AppError(400, 'wrong password');
        }
        const salt = bcrypt.genSaltSync(10);
        const token = bcrypt.hashSync(user.username, salt);

        user.auth.sessionToken = token;
        await user.save();

        res.cookie('STATOV-AUTH', token);
        res.status(200).json(user).end();

    } catch (e) {
        next(e);
    }
};