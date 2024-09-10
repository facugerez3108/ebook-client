import axios from 'axios';

export const login = async (email: string, password: string) => {
    try{
        const response = await axios.post(`http://localhost:5000/api/auth/login`, {
            email,
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

