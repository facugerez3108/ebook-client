import axios from 'axios';
import { AuthResponse } from '../types/types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try{
        const response = await axios.post<AuthResponse>(`http://localhost:5000/api/auth/login`, {
            email,
            password
        })
        console.log(response.data);
        localStorage.setItem('logged', 'true');
        
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const logout = async () => {
    try{
        const response = await axios.post(`${process.env.SERVER_APP_URL}/api/auth/logout`);
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

