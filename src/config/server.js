import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3002',
});

api.interceptors.request.use(
    config => {
        if (!config.url.endsWith('/login') && !config.url.endsWith('/register')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
      return config;
    },
    error => {
      Promise.reject(error);
    });
  

export default api;