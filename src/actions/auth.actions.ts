import axios from 'axios';
import { AuthResponse } from '../types/types';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://ebook-server-drab.vercel.app';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try{
        const response = await axios.post<AuthResponse>(`${serverUrl}/api/auth/login`, {
            email,
            password
        }, {
            withCredentials: true
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
        const response = await axios.post(`${serverUrl}/api/auth/logout`, {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

