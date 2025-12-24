
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { logout } from '../features/authSlice';
import { store } from '../store';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout()); 
      toast.error("פג תוקף החיבור, אנא התחבר שנית");
    } 
    
    else if (error.response?.status === 500) {
      toast.error("שגיאת שרת פנימית, נסה שוב מאוחר יותר");
    }
    
    else if (!error.response) {
      toast.error("אין תקשורת עם השרת");
    }

    return Promise.reject(error);
  }
);

export default api;