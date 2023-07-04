
import { Schema, model } from 'mongoose';
import {  UserSchema } from '../types';


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

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.auth;
    }
});

export default model<UserSchema>('User', userSchema);
