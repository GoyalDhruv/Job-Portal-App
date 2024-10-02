import axios from 'axios';
import store from '../redux/store.js';
import { clearUser } from '../redux/authSlice';
import { toast } from 'sonner';
import { USER_API_END_POINT } from './constant';

const api = axios.create({
    baseURL: USER_API_END_POINT,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            toast.error('Session has expired. Please log in again.');
            setTimeout(() => {
                window.location.href = '/';
                localStorage.removeItem('user');
                store.dispatch(clearUser());
            }, 1000);
        }
        return Promise.reject(error);
    }
);

export default api;
