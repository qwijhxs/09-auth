export interface User {
    username: string,
    email: string,
    avatar?: string
}

export interface AuthRequest {
    email: string,
    password: string
}