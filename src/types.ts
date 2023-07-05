/////////TYPES////////
//

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