/////////TYPES////////

//////types:


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
}

//UserNoId
export interface User {
    username: string,
    password: string,
    id: string
}

export type UserNoId = Omit<User, 'id'>;