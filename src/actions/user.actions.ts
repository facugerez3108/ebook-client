import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

export const createUser = async (name: string, email: string, password: string, role: string) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/`, {
      name,
      email,
      password,
      role
    });
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};

export const editUser = async (id: number, name: string, email: string, role: string) => {
  try{
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, {
      name,
      email,
      role
    });
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};

export const getUser = async (id: number) => {
  try {
    
    const response = await axios.get(`${serverUrl}/api/users/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el usuario.");
  }
};

export const getUsers = async () => {
  try{
    const response = await axios.get(`${serverUrl}/api/users`);
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
        }
    });
    return response.data.role;

  }catch(error){
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try{
    const response = await axios.delete(`${serverUrl}/api/users/${id}`);
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};