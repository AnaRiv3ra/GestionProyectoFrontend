import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } from '../../service/tareaAPI';

const ListaTareas = () => {
    const { id: proyectoId } = useParams();
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('Pendiente');
    const [prioridad, setPrioridad] = useState(1);
    const [idEditando, setIdEditando] = useState(null);
    const [error, setError] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        cargarTareas();
    }, [proyectoId]);

    const cargarTareas = async () => {
        try {
            const data = await obtenerTareas(proyectoId);
            setTareas(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        const tarea = {
            proyecto: proyectoId,
            titulo,
            descripcion,
            estado,
            prioridad,
        };

        try {
            if (idEditando) {
                await actualizarTarea(idEditando, tarea);
                setIdEditando(null);
            } else {
                await crearTarea(tarea);
            }
            toggleForm();
            setTitulo('');
            setDescripcion('');
            setEstado('Pendiente');
            setPrioridad(1);
            cargarTareas();
        } catch (error) {
            setError(error.message);
        }
    };

    const manejarEliminar = async (id) => {
        try {
            await eliminarTarea(id);
            cargarTareas();
        } catch (error) {
            setError(error.message);
        }
    };

    const manejarEditar = (tarea) => {
        setIdEditando(tarea._id);
        setTitulo(tarea.titulo);
        setDescripcion(tarea.descripcion);
        setEstado(tarea.estado);
        setPrioridad(tarea.prioridad);
        setIsFormVisible(true);
    };

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
        if (!isFormVisible) {
            setIdEditando(null);
            setTitulo('');
            setDescripcion('');
            setEstado('Pendiente');
            setPrioridad(1);
        }
    };

    const cancelarEdicion = () => {
        setIdEditando(null);
        toggleForm();
    };
    const handleProyectoRedirect = () => {
        navigate(`/proyectos`);
    };

    return (
        <div>
            <h2>Lista de Tareas</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='container'>
            <button onClick={handleProyectoRedirect}>Volver</button>
            <button onClick={toggleForm} className="open-form-button">
                {isFormVisible ? 'Cerrar Formulario' : 'Abrir Formulario'}
            </button>
            </div>
            

            {isFormVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close" onClick={toggleForm}>&times;</button>
                        <form onSubmit={manejarSubmit}>
                            <input
                                type="text"
                                placeholder="Título de la tarea"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="En Proceso">En Proceso</option>
                                <option value="Completada">Completada</option>
                            </select>
                            <select
                                value={prioridad}
                                onChange={(e) => setPrioridad(Number(e.target.value))}
                            >
                                <option value={1}>Muy Alta</option>
                                <option value={2}>Alta</option>
                                <option value={3}>Normal</option>
                                <option value={4}>Baja</option>
                                <option value={5}>Muy Baja</option>
                            </select>
                            <button type="submit">{idEditando ? 'Actualizar Tarea' : 'Crear Tarea'}</button>
                            {idEditando && <button type="button" onClick={cancelarEdicion}>Cancelar</button>}
                        </form>
                    </div>
                </div>
            )}
            <table className="project-table" >
                <thead className='titulo'>
                    <tr>
                        <th>titulo</th>
                        <th>Descripción</th>
                        <th>estado</th>
                        <th>prioridad</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.map((tarea) => (
                        <tr key={tarea._id}>
                            <td>{tarea.titulo}</td>
                            <td>{tarea.descripcion}</td>
                            <td>{tarea.estado}</td>
                            <td>
                                {{
                                    1: 'Muy Alta',
                                    2: 'Alta',
                                    3: 'Normal',
                                    4: 'Baja',
                                    5: 'Muy Baja'
                                }[tarea.prioridad]}
                            </td>
                            <td>
                                <button onClick={() => manejarEditar(tarea)}>Editar</button>
                                <button onClick={() => manejarEliminar(tarea._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaTareas;
