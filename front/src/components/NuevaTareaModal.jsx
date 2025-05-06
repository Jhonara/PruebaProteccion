import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const NuevaTareaModal = ({ cerrar }) => {
    const [estados, setEstados] = useState([]);
    const [usuarios, setUsuarios] = useState([]); 

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/estados`)
            .then((res) => setEstados(res.data))
            .catch((error) => {
                console.error("Error al obtener estados:", error);
                setEstados([]); 
            });

        axios.get(`${import.meta.env.VITE_API_URL}/usuarios`)
            .then((res) => setUsuarios(res.data))
            .catch((error) => {
                console.error("Error al obtener usuarios:", error);
                setUsuarios([]); 
            });
    }, []);

    const validationSchema = Yup.object({
        descripcion: Yup.string().required("La descripción es obligatoria"),
        estado: Yup.string().required("El estado es obligatorio"),
        asignado: Yup.string().required("Debe seleccionar un usuario"),
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/tareas`, values);
            Swal.fire("¡Tarea guardada!", "La nueva tarea ha sido añadida correctamente.", "success");
            cerrar();
        } catch (error) {
            console.error("Error al guardar tarea:", error);
        }
    };

    return (
        <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    <h5 className="text-center">Agregar Nueva Tarea</h5>
                    <Formik initialValues={{ descripcion: "", estado: "", asignado: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <div className="mb-3">
                                <label>Descripción:</label>
                                <Field type="text" name="descripcion" className="form-control" />
                                <ErrorMessage name="descripcion" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label>Estado:</label>
                                <Field as="select" name="estado" className="form-control">
                                    <option value="">Seleccione...</option>
                                    {Array.isArray(estados) ? estados.map((estado) => (
                                        <option key={estado.id} value={estado.id}>{estado.descripcion}</option>
                                    )) : <option disabled>Cargando estados...</option>}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label>Asignado:</label>
                                <Field as="select" name="asignado" className="form-control">
                                    <option value="">Seleccione...</option>
                                    {Array.isArray(usuarios) ? usuarios.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                                    )) : <option disabled>Cargando usuarios...</option>}
                                </Field>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Guardar</button>
                        </Form>
                    </Formik>
                    <button className="btn btn-secondary mt-2 w-100" onClick={cerrar}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default NuevaTareaModal;