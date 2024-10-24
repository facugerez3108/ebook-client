import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://ebook-server-six.vercel.app';

export const createPrestamo = async (
    bookId: number,
    compradorId: number,
    fechaPrestamo: Date,
    fechaDevolucion: Date,
    codigo: string,
    status: string
) => {
    try{
        const response = await axios.post(`${serverUrl}/api/prestamos`, {
            bookId,
            compradorId,
            fechaPrestamo,
            fechaDevolucion,
            codigo,
            status
        },  {
            withCredentials: true
        });
        return response.data;
        
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getPrestamo = async (id: number) => {
    try{
        const response = await axios.get(`${serverUrl}/api/prestamos/${id}`,  {
            withCredentials: true
        });
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getPrestamos = async () => {
    try{
        const response = await axios.get(`${serverUrl}/api/prestamos`,  {
            withCredentials: true
        });
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const editPrestamos = async (
    id: number,
    updateData: {
      fechaPrestamo?: Date;
      fechaDevolucion?: Date;
      status?: string;
    }
  ) => {
    try {
      const response = await axios.patch(`${serverUrl}/api/prestamos/${id}`, updateData,  {
        withCredentials: true
    });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const deletePrestamos = async (id: number) => {
    try{
        const response = await axios.delete(`${serverUrl}/api/prestamos/${id},  {
            withCredentials: true
        }`);
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}