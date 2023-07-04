import UserModel from '../models/user';
import { User } from '../types';
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

// fetch all users
export const fetchUsers = async (): Promise<Array<User>> => {
    const users = await UserModel.find({});
    return users.map(u => u.toJSON());
};
//fetch one user
// export const fetchOneUser = async (props: object): Promise<Array<User>> => {
//     const user = await UserModel.findOne( props );
//     if (!user) {
//         throw new AppError(404, 'User not found');
//     }
//     return user.map(u => u.toJSON());
// };

