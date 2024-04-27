import React, { useState } from 'react'; // Importación de React y useState para manejar el estado local del componente
import axios from 'axios'; // Importación de Axios para realizar solicitudes HTTP
import { useNavigate } from 'react-router-dom'; // Importación de useNavigate para redireccionar a otras rutas

const RegistroEmpleado = ({ actualizarListaEmpleados }) => {
    const navigate = useNavigate(); // Hook useNavigate para la navegación entre rutas
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del empleado
    const [email, setEmail] = useState(''); // Estado para almacenar el email del empleado
    const [rol, setRol] = useState(''); // Estado para almacenar el rol del empleado 

    // Función para manejar el envío del formulario de registro
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        try {
            // Crear un nuevo objeto de empleado con los datos del estado
            const nuevoEmpleado = {
                nombre,
                email,
                rol,
            };
            console.log(nuevoEmpleado);
            // Realizar una solicitud POST para registrar el nuevo empleado en el servidor
            await axios.post('http://localhost:5000/api/empleados', nuevoEmpleado);

            // Limpiar los campos después de enviar el formulario
            setNombre('');
            setEmail('');
            setRol('');
            
            // Redireccionar a la página de empleados después de registrar uno nuevo
            navigate('/empleados');

            // Mostrar una alerta indicando que el empleado se registró exitosamente
            alert('Empleado registrado exitosamente');
        } catch (error) {
            console.error('Error al registrar el empleado:', error); // Mostrar un mensaje de error en la consola si ocurre un error al registrar el empleado
        }
    };

    return (
        <div>
            <h2>Registro de Empleado</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <label htmlFor="nombre">Nombre</label>
                </div>
                <div className="input-field">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        id="rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    />
                    <label htmlFor="rol">Rol</label>
                </div>
                <div className="center-align">
                    <button type="submit" className="btn green">
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistroEmpleado;

