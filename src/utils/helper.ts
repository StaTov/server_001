import { UserNoId } from '../types';

///////////////// check type:

//isString 
const isString = (text: unknown): text is string => {
    if (text && typeof text === 'string') return true;
    return false;
};

///////////////// check newUser:

//toNewUser
export const toNewUser = (obj: unknown): UserNoId => {

    if (!obj) throw new Error('missing user data');
    if (typeof obj !== 'object') throw new Error('incorrect user data');

    if ('username' in obj && 'password' in obj) {
        const username = parseUsername(obj.username);
        const password = parsePassword(obj.password);

        return { username, password };
    }
    throw new Error('unknow error');
};

//parseUsername
const parseUsername = (username: unknown): string => {
    if (!username || !isString(username)) {
        throw new Error('username missing not valid');
    }
    return username;
};

//parsePassword
const parsePassword = (pwd: unknown): string => {
    if (!pwd || !isString(pwd)) {
        throw new Error('password missing or not valid');
    }
    return pwd;
};