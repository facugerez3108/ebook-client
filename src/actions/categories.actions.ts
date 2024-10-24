import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://ebook-server-drab.vercel.app';

export const createCategory = async (title: string) => {
    try{
        const respose = await axios.post(`${serverUrl}/api/categorias`, {title},  {
            withCredentials: true
        });
        console.log(respose.data);
        return respose.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getCategory = async (id: number) => {
    try{
        const response = await axios.get(`${serverUrl}/api/categorias/${id}`,  {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getCategories = async () => {
    try{
        const response = await axios.get(`${serverUrl}/api/categorias`,  {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const editCategories = async (id: number, title: string) => {
    try{
        const response = await axios.patch(`${serverUrl}/api/categorias/${id}`, {title},  {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const deleteCategories = async (id: number) => {
    try{
        const response = await axios.delete(`${serverUrl}/api/categorias/${id}`,  {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

