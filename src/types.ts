/////////TYPES////////
//

// UserSchema
export interface UserSchema {
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
    email: {
        type: string,
        required: boolean
    }
}

// User
export interface User {
    username: string,
    password: string,
    email: string,
    id: string
}
// UserNoId
export type UserNoId = Omit<User, 'id'>;