export interface IJwtPayload {
    username: string
    fullName: string
    _id: string
}

export interface ILogin {
    username: string
    password: string
}