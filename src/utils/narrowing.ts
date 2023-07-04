import { LoginData, UserData } from '../types';
import { AppError } from './middleware';

///////////////// check type:

//isString 
const isString = (text: unknown): text is string => {
    if (text && typeof text === 'string') return true;
    return false;
};

///////////////// check userData:

//checkRegData
export const checkUserData = (obj: unknown): UserData => {

    if (!obj) {
        throw new AppError(400, 'missing user data');
    }
    if (typeof obj !== 'object') {
        throw new AppError(400, 'incorrect user data');
    }

    if ('username' in obj && 'password' in obj && 'email' in obj) {
        const username = parseUsername(obj.username);
        const password = parsePassword(obj.password);
        const email = parseEmail(obj.email);

        return { username, password, email };
    }
    throw new Error('incorrect user data');
};

export const checkLoginData = (obj: unknown): LoginData => {
    if (!obj) {
        throw new AppError(400, 'missing login data');
    }
    if (typeof obj !== 'object') {
        throw new AppError(400, 'incorrect login data');
    }
    if ('password' in obj && 'email' in obj) {
        const password = parsePassword(obj.password);
        const email = parseEmail(obj.email);

        return { email, password };
    }
    throw new Error('incorrect login data');
};
//parseEmail
const parseEmail = (email: unknown): string => {
    if (!email || !isString(email) || !email.includes('@')) {
        throw new AppError(400, 'email missing or not valid');
    }
    return email;
};

//parseUsername
const parseUsername = (username: unknown): string => {
    if (!username || !isString(username)) {
        throw new AppError(400, 'username missing or not valid');
    }
    return username;
};

//parsePassword
const parsePassword = (pwd: unknown): string => {
    if (!pwd || !isString(pwd)) {
        throw new AppError(400, 'password missing or not valid');
    }
    return pwd;
};