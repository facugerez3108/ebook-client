import axios from 'axios';

const serverUrl = process.env.REAC_APP_SERVER_URL || 'https://ebook-server-six.vercel.app';

export const createBook = async (
    title: string, 
    autor: string, 
    categoryId: number, 
    code: string, 
    cantidad: number
) => {
    try{
        const response = await axios.post(`${serverUrl}/api/libros/`, {
            title,
            autor,
            categoryId,
            code,
            cantidad
        }, {
            withCredentials: true
        });
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getBooks = async () => {
    try{
        const response = await axios.get(`${serverUrl}/api/libros/`,  {
            withCredentials: true
        });
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getBook = async (id: number) => {
    try{
        const response = await axios.get(`${serverUrl}/api/libros/${id}`,  {
            withCredentials: true
        });
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const updateBooks = async (
    id: number,
    title: string,
    autor: string,
    categoryId: number,
    code: string,
    cantidad: number
) => {
    try{
        const response = await axios.patch(`${serverUrl}/api/libros/${id}`, {
            title,
            autor,
            categoryId,
            code,
            cantidad
        },  {
            withCredentials: true
        });
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const deleteBook = async (id: number) => {
    try{
        const response = await axios.delete(`${serverUrl}/api/libros/${id}`,  {
            withCredentials: true
        });
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}