import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import NuevaTareaModal from "../components/NuevaTareaModal";
import EditarTareaModal from "../components/EditarTareaModal";

const Tareas = () => {
    const [tareas, setTareas] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/tareas`)
            .then((res) => setTareas(res.data))
            .catch((error) => console.error("Error al obtener tareas:", error));
    }, []);

    const eliminarTarea = (id) => {
        Swal.fire({
            title: "¿Eliminar tarea?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/tareas/${id}`)
                    .then(() => {
                        setTareas(tareas.filter((t) => t.id !== id));
                        Swal.fire("Eliminado", "La tarea ha sido eliminada correctamente.", "success");
                    })
                    .catch((error) => {
                        console.error("Error al eliminar tarea:", error);
                        Swal.fire("Error", "No se pudo eliminar la tarea.", "error");
                    });
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-center text-primary">Gestión de Tareas</h2>

                <div className="d-flex justify-content-between mb-3">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Filtrar por estado, usuario..."
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button className="btn btn-success btn-lg" onClick={() => setMostrarModal(true)}>
                        + Nueva Tarea
                    </button>
                </div>

                <table className="table table-hover table-striped shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Asignado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tareas.map((tarea) => (
                            <tr key={tarea.id}>
                                <td>{tarea.id}</td>
                                <td>{tarea.descripcion}</td>
                                <td>{tarea.estado.descripcion}</td>
                                <td>{tarea.asignado.nombre}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => {
                                        setTareaSeleccionada(tarea);
                                        setMostrarEditarModal(true);
                                    }}>
                                        Editar
                                    </button>
                                    <button className="btn btn-danger" onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {mostrarModal && <NuevaTareaModal cerrar={() => setMostrarModal(false)} />}
                {mostrarEditarModal && <EditarTareaModal tarea={tareaSeleccionada} cerrar={() => setMostrarEditarModal(false)} />}
            </div>
        </>
    );
};

export default Tareas;