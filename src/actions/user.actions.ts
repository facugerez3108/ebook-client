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
  try{
    const response = await axios.get(`${process.env.SERVER_APP_URL}/api/auth/user/${id}`);
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};

export const queryUsers = async () => {
  try{
    const response = await axios.get(`${process.env.SERVER_APP_URL}/api/auth/users`);
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};

export const getUserRole = async (token: string) => {
  try{
    const response = await axios.get(`${process.env.SERVER_APP_URL}/api/auth/user/role}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data.role;

  }catch(error){
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try{
    const response = await axios.delete(`${process.env.SERVER_APP_URL}/api/auth/user/${id}`);
    console.log(response.data);
    return response.data;

  }catch(error){
    console.log(error);
  }
};