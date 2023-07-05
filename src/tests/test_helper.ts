//import { AppError } from '../utils/middleware';

// initial users
export const initialUsers = [
    {
        email: 'one@test.com',
        username: 'Stainslav',
        auth: {
            password: 'one',
        },
        role: ['guest']
    },
    {
        email: 'two@test.com',
        username: 'Olya',
        auth: {
            password: 'two',
        },
        role: ['guest']
    }
];

//user object to register new user
export const userObj = { username: 'testName', password: 'testPassword', email: 'test@email.com' };





