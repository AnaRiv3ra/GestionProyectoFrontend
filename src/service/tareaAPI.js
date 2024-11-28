import api from './api';

export const obtenerTareas = async () => {
    try {
        const response = await api.get('/tareas');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error al obtenerlas tarea');
    }
};

export const crearTarea = async (tarea) => {
    try {
        console.log('CREAR'+tarea)
        const response = await api.post('/tarea', tarea);
        return response.data;
        
    } catch (error) {
        console.log('ERROR'+tarea)
        throw new Error(error.response?.data || 'Error al crear tarea');
    }
};

export const actualizarTarea = async (id, tarea) => {
    try {
        const response = await api.put(`/tarea/${id}`, tarea);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error al actualizar tarea');
    }
};

export const eliminarTarea= async (id) => {
    try {
        const response = await api.delete(`/tarea/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error al eliminar tarea');
    }
};
