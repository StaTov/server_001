
import { Schema, model } from 'mongoose';
import { UserSchema } from '../types';


const userSchema = new Schema<UserSchema>({
    email: {
        type: 'String',
        required: true,
        unique: true,
    },
    username: {
        type: 'String',
        required: true,
        unique: true,
        min: [2, 'username is too short, min 3'],
        max: [25, 'username is too long, max 25'],
    },
    auth: {
        password: {
            type: 'String',
            required: true,
            select: false,
        },
        sessionToken: {
            type: 'String',
            select: false,
        },
    },
    role: {
        type: [String],
        require: true,
    }
});

//User schema transform to JSON
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.auth;
    }
});

const UserModel = model<UserSchema>('User', userSchema);

//methods

export const getUserByUsername = (username: string) => UserModel.findOne({username});
export const findByToken = (token: string) => UserModel.findOne({ 'auth.sessionToken': token });
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const getUserById = (id: string) => UserModel.findById(id);
export const getUsers = () => UserModel.find({});
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const insertMany = (obj: object) => UserModel.insertMany(obj);
export const deleteMany = () => UserModel.deleteMany({});
export const createUser = (email: string, passwordHash: string, username: string) => {
    return new UserModel({
        email,
        username,
        auth: {
            password: passwordHash,
        },
        role: ['guest']
    });
};



