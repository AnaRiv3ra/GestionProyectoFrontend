import api from './api';

export const iniciarSesion = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;  // Retorna el token o datos de usuario desde el backend
    } catch (error) {
        throw new Error(error.response?.data || 'Error al iniciar sesión');
    }
};

export const registrarUsuario = async (nombre, email, password) => {
    try {
        const response = await api.post('/register', { nombre, email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error al registrar usuario');
    }
};
