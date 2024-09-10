import axios from 'axios';

export const login = async (username: string, password: string) => {
    try{
        const response = await axios.post(`${process.env.SERVER_APP_URL}/api/auth/login`, {
            username,
            password
        })
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
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

