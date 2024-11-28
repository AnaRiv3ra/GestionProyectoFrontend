import api from './api';

export const obtenerProyectos = async () => {
    try {
        const response = await api.get('/proyectos');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error al obtener proyectos');
    }
};

export const crearProyecto = async (proyecto) => {
    try {
        const response = await api.post('/proyecto', proyecto);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error al crear proyecto');
    }
};

export const actualizarProyecto = async (id, proyecto) => {
    try {
        const response = await api.put(`/proyecto/${id}`, proyecto);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error al actualizar proyecto');
    }
};

export const eliminarProyecto = async (id) => {
    try {
        const response = await api.delete(`/proyecto/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error al eliminar proyecto');
    }
};
