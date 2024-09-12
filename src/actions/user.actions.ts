import axios from 'axios';

export const createUser = async (name: string, email: string, password: string, role: string) => {
  try{
    const response = await axios.post(`${process.env.SERVER_APP_URL}/api/auth/register`, {
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

export const getUser = async (id: number) => {
  try {
    const serverUrl = process.env.SERVER_APP_URL || 'http://localhost:5000';
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
    const response = await axios.get(`${process.env.SERVER_APP_URL}/api/users`);
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};

export const getUserRole = async (token: string) => {
  try{
    const response = await axios.get(`http://localhost:5000/api/users/role`, {
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
    const response = await axios.delete(`${process.env.SERVER_APP_URL}/api/users/${id}`);
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};