
import { Schema, model } from 'mongoose';
import { UserSchema } from '../types';


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

<<<<<<< HEAD

export default model('User', userSchema);
=======
export default model<UserSchema>('User', userSchema);
>>>>>>> 2758586ca991d8400fc7cc9dd68f8797092f89c5
