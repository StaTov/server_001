/////////TYPES////////
//

// UserSchema
// export interface UserSchema {
//     email: {
//         type: string,
//         required: boolean,
//         unique: true,
//     }
//     username: {
//         type: string,
//         required: boolean,
//         min: Array<number | string>,
//         max: Array<number | string>,
//     },
//     auth: {
//         password: {
//             type: string,
//             required: boolean,
//             select: boolean,
//         },
//         sessionToken?: {
//             type: string,
//         },
//     },
//     role: {
//         type: string[] | [],
//         required: boolean,
//     }
// }

export interface UserSchema {
    email: string,
    username: string,
    auth: {
        password: string,
        sessionToken?: string,
    },
    role: string[],
}
// RegData
export interface UserData {
    email: string,
    username: string,
    password: string
}

//LoginData
export type LoginData = Omit<UserData, 'username'>;

// User
export interface User {
    username: string,
    password: string,
    email: string,
    id: string
}
// UserNoId
export type UserNoId = Omit<User, 'id'>;