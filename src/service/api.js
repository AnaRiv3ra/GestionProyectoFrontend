import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gestionproyectobackend-n3p1.onrender.com',  // Cambia esta URL si es diferente en tu backend
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            
            localStorage.removeItem('token');
            window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default api;