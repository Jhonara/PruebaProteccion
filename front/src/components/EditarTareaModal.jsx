import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const EditarTareaModal = ({ tarea, cerrar }) => {
    const [estados, setEstados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/estados`).then((res) => setEstados(res.data));
        axios.get(`${import.meta.env.VITE_API_URL}/usuarios`).then((res) => setUsuarios(res.data));
    }, []);

    const validationSchema = Yup.object({
        descripcion: Yup.string().required("La descripción es obligatoria"),
        estado: Yup.string().required("El estado es obligatorio"),
        asignado: Yup.string().required("Debe seleccionar un usuario"),
    });

    const handleSubmit = async (values) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/tareas/${tarea.id}`, values);
            Swal.fire("¡Actualizado!", "La tarea ha sido modificada.", "success");
            cerrar();
        } catch (error) {
            console.error("Error al actualizar tarea:", error);
        }
    };

    return (
        <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    <h5 className="text-center">Editar Tarea</h5>
                    <Formik initialValues={{ descripcion: tarea.descripcion, estado: tarea.estado.id, asignado: tarea.asignado.id }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <div className="mb-3">
                                <label>Descripción:</label>
                                <Field type="text" name="descripcion" className="form-control" />
                                <ErrorMessage name="descripcion" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label>Estado:</label>
                                <Field as="select" name="estado" className="form-control">
                                    {estados.map((estado) => (
                                        <option key={estado.id} value={estado.id}>{estado.descripcion}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label>Asignado:</label>
                                <Field as="select" name="asignado" className="form-control">
                                    {usuarios.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                                    ))}
                                </Field>
                            </div>
                            <button type="submit" className="btn btn-warning w-100">Actualizar</button>
                        </Form>
                    </Formik>
                    <button className="btn btn-secondary mt-2 w-100" onClick={cerrar}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default EditarTareaModal;