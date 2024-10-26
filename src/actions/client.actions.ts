import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://ebook-server-production.up.railway.app';

export const createClient = async (nombre: string, apellido: string, codigo: string) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/clientes/`, {
            nombre,
            apellido,
            codigo
        });
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const getClients = async () => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/clientes/`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const getClient = async (id: number) => {
    try {
        
        const response = await axios.get(`${serverUrl}/api/clientes/${id}`);
        return response.data;

    }catch(error){
        console.log(error);
    }
}

export const updateClient = async (id: number, nombre: string, apellido: string, codigo: string) => {
    try{
        const response = await axios.patch(`${serverUrl}/api/clientes/${id}`, {
            nombre,
            apellido,
            codigo
        });
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const deleteClient = async (id: number) => {
    try{
        const response = await axios.delete(`${serverUrl}/api/clientes/${id}`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}