import axios from 'axios';
import { toast } from 'react-toastify';

const API = (token) =>
    axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        headers: { Authorization: token },
    });
export const sendMessage = async (body) => {
    try {
        const token = localStorage.getItem('userToken');
        const { data } = await API(token).post('/api/message/', body);
        return data;
    } catch (error) {
        console.error('Error in sendMessage API:', error);
        toast.error('Failed to send message. Please try again.');
        throw error; 
    }
};

export const fetchMessages = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        const { data } = await API(token).get(`/api/message/${id}`);
        return data;
    } catch (error) {
        console.error('Error in fetchMessages API:', error);
        toast.error('Failed to fetch messages. Please try again.'); 
        throw error;
    }
};
