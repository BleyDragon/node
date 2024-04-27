import React, { useEffect, useState } from 'react'; // Importación de React y useState para manejar el estado local del componente
import axios from 'axios'; // Importación de Axios para realizar solicitudes HTTP
import { useParams, useNavigate } from 'react-router-dom'; // Importación de useParams y useNavigate para obtener parámetros de la URL y realizar la navegación entre rutas

const EditarEmpleado = () => {
  const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del empleado
  const [email, setEmail] = useState(''); // Estado para almacenar el email del empleado
  const [rol, setRol] = useState(''); // Estado para almacenar el rol del empleado
  const { id } = useParams(); // Obtiene el ID del empleado de los parámetros de la URL
  const history = useNavigate(); // Hook useNavigate para la navegación entre rutas

  // Efecto para obtener los datos del empleado a editar al montar el componente
  useEffect(() => {
    const obtenerEmpleado = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/empleados/${id}`); // Realiza una solicitud GET para obtener los datos del empleado
        const { nombre, email, rol } = response.data; // Extrae los datos del empleado de la respuesta
        setNombre(nombre); // Actualiza el estado con el nombre del empleado
        setEmail(email); // Actualiza el estado con el email del empleado
        setRol(rol); // Actualiza el estado con el rol del empleado
      } catch (error) {
        console.error('Error al obtener el empleado:', error); // Muestra un mensaje de error en la consola si ocurre un error al obtener los datos del empleado
      }
    };

    obtenerEmpleado(); // Ejecuta la función para obtener los datos del empleado
  }, [id]); // El efecto se ejecuta cada vez que cambia el ID del empleado

  // Función para manejar el envío del formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    try {
      const empleadoActualizado = {
        nombre,
        email,
        rol,
      };

      await axios.put(`http://localhost:5000/api/empleados/${id}`, empleadoActualizado); // Realiza una solicitud PUT para actualizar los datos del empleado
      history(`/empleados/${id}`); // Redirecciona a la página de detalles del empleado después de actualizar los datos
    } catch (error) {
      console.error('Error al actualizar el empleado:', error); // Muestra un mensaje de error en la consola si ocurre un error al actualizar los datos del empleado
    }
  };

  return (
    <div>
      <h2>Editar Empleado</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos de entrada para editar los datos del empleado */}
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
        <div className='center-align'>
          {/* Botón para enviar el formulario de edición */}
          <button type="submit" className="btn green">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarEmpleado;


