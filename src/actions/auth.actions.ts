import axios from 'axios';
import { AuthResponse } from '../types/types';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://ebook-server-production.up.railway.app';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try{
        const response = await axios.post<AuthResponse>(`${serverUrl}/api/auth/login`, {
            email,
            password
        },) 
        localStorage.setItem('logged', 'true');
        
        return response.data;
    }catch(error){
        throw error;
    }
}

export const logout = async () => {
    try{
        const response = await axios.post(`${serverUrl}/api/auth/logout`,);
        return response.data;
    }catch(error){
        throw error;
    }
}

