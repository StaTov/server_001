
import { Schema, model } from 'mongoose';

interface UserSchema {
    username: {
        type: string,
        required: boolean,
        min: Array<number | string>,
        max: Array<number | string>,
    },
    password: {
        type: string,
        required: boolean,
    },

}

const userSchema = new Schema<UserSchema>({
    username: {
        type: 'String',
        required: true,
        min: [3, 'username is too short, min 3'],
        max: [25, 'username is too long, max 25'],
    },
    password: {
        type: 'String',
        required: true,
    }
});

export default model('User', userSchema);