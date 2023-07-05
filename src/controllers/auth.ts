import { NextFunction, Request, Response } from 'express';
import { createUser, getUserByEmail, getUserByUsername } from '../models/user';
import { AppError } from '../utils/middleware';
import { checkLoginData, checkUserData } from '../utils/narrowing';
import bcrypt from 'bcryptjs';


export const regUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password } = checkUserData(req.body);

        const existUsername = await getUserByUsername(username);

        if (existUsername) {
            throw new AppError(400, 'this username alrady exist');
        }
        const existEmail = await getUserByEmail(email);

        if (existEmail) {
            throw new AppError(400, 'this email alrady exist');
        }
        //hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        //create new user
        const newUser = createUser(email, passwordHash, username);
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
        const user = await getUserByEmail(email).select('+auth.password');

        if (!user) {
            throw new AppError(400, 'this email is not registered ');
        }

        const existPassword = await bcrypt.compare(password, user.auth.password);

        if (!existPassword) {
            throw new AppError(400, 'wrong password');
        }
        //create Token
        const saltRounds = 10;
        const token = await bcrypt.hash(user.username, saltRounds);
        //add Token to user
        user.auth.sessionToken = token;
        await user.save();
        //set cookie auth
        res.cookie('STATOV-AUTH', token);
        res.status(200).json(user).end();

    } catch (e) {
        next(e);
    }
};