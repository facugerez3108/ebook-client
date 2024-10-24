import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://ebook-server-drab.vercel.app';

export const createUser = async (name: string, email: string, password: string, role: string) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/`, {
      name,
      email,
      password,
      role
    },  {
      withCredentials: true
  });
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};

export const editUser = async (id: number, name: string, email: string, role: string) => {
  try{
    const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, {
      name,
      email,
      role
    },  {
      withCredentials: true
  });
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};

export const getUser = async (id: number) => {
  try {
    
    const response = await axios.get(`${serverUrl}/api/users/${id}`,  {
      withCredentials: true
  });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el usuario.");
  }
};

export const getUsers = async () => {
  try{
    const response = await axios.get(`${serverUrl}/api/users`,  {
      withCredentials: true
  });
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};

export const getUserRole = async (token: string) => {
  try{
    const response = await axios.get(`${serverUrl}/api/users/role`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    }, );
    return response.data.role;

  }catch(error){
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try{
    const response = await axios.delete(`${serverUrl}/api/users/${id}`,  {
      withCredentials: true
  });
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};