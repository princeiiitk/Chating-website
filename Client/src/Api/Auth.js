
import axios from 'axios';
import { toast } from 'react-toastify';


const API = (token) =>
    axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        headers: { Authorization: token },
    });

let url = import.meta.env.VITE_SERVER_URL;


export const loginUser = async (body) => {
    try {
        
        return await axios.post(`${url}/auth/login`, body);
    } catch (error) {
       
        console.error('Error in loginUser API:', error);
        toast.error('Login failed. Please try again!');
    }
};





export const registerUser = async (body) => {
    try {
      
        return await axios.post(`${url}/auth/register`, body);
    } catch (error) {
        
        console.error('Error in registerUser API:', error);
        toast.error('Registration failed. Please try again!');
    }
};

export const validUser = async () => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) {
            throw new Error('No token found');
        }
        const { data } = await API(token).get(`/auth/valid`);
       
        return data;
    } catch (error) {
        console.error('Error in validUser API:', error);
        toast.error('Validation failed. Please try again!');
    }
};


export const searchUsers = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        return await API(token).get(`/api/user?search=${id}`);
    } catch (error) {
        console.error('Error in searchUsers API:', error);
        toast.error('User search failed. Please try again!');
    }
};


export const updateUser = async (id, body) => {
    try {
        const token = localStorage.getItem('userToken');
        const { data } = await API(token).patch(`/api/users/update/${id}`, body);
        return data;
    } catch (error) {
        console.error('Error in updateUser API:', error);
        toast.error('User update failed. Please try again!');
    }
};


export const checkValid = async () => {
    const data = await validUser();
    if (!data?.user) {
        window.location.href = '/login';
    } else {
        window.location.href = '/chats';
    }
};
