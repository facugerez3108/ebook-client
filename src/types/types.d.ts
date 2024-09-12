export interface AuthResponse {
    tokens: {
        access: {
            token: string,
            expires: string 
        },
        refresh: {
            token: string,
            expires: string 
        }
    },
    user: UserProps
}

export interface UserProps {
    id: number,
    email: string,
    role: string,
    name: string,  
    createdAt: string;
    updatedAt: string;

}