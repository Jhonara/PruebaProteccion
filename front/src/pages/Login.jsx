import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  

const Login = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        nombre: Yup.string().required("El usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values);
            localStorage.setItem("token", response.data.token);
            navigate("/tareas");
        } catch (error) {
            Swal.fire({
                title: "Error en el inicio de sesión",
                text: "Usuario o contraseña incorrectos",
                icon: "error",
                confirmButtonText: "Intentar de nuevo",
            });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center text-primary">Iniciar Sesión</h2>
                <Formik initialValues={{ nombre: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form>
                        <div className="mb-3">
                            <label className="form-label">Usuario:</label>
                            <Field type="text" name="nombre" className="form-control" />
                            <ErrorMessage name="nombre" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña:</label>
                            <Field type="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;