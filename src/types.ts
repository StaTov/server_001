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

export interface UserNoId {
    username: string,
    password: string
}