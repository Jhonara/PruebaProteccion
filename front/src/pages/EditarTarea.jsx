import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditarTarea = () => {
    const { id } = useParams();
    const [tarea, setTarea] = useState(null);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/tareas/${id}`).then((res) => setTarea(res.data));
        axios.get(`${import.meta.env.VITE_API_URL}/estados`).then((res) => setEstados(res.data));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}/tareas/${id}`, tarea);
    };

    return tarea ? (
        <form onSubmit={handleSubmit}>
            <label>Estado:</label>
            <select value={tarea.estado.id} onChange={(e) => setTarea({ ...tarea, estado: { id: e.target.value } })}>
                {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>{estado.descripcion}</option>
                ))}
            </select>

            <label>Fecha Fin:</label>
            <input type="date" value={tarea.fechaFin} onChange={(e) => setTarea({ ...tarea, fechaFin: e.target.value })} />

            <button type="submit">Guardar cambios</button>
        </form>
    ) : null;
};

export default EditarTarea;