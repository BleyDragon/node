import { Link, useParams } from 'react-router-dom'; // Importación de Link y useParams para la navegación entre rutas y obtener parámetros de la URL
import React, { useEffect, useState } from 'react'; // Importación de React y useEffect para manejar el efecto secundario
import axios from 'axios'; // Importación de Axios para realizar solicitudes HTTP

const DetallesEmpleado = () => {
  const [empleado, setEmpleado] = useState(null); // Estado para almacenar los datos del empleado
  const { id } = useParams(); // Obtiene el ID del empleado de los parámetros de la URL

  // Efecto para obtener los detalles del empleado al montar el componente
  useEffect(() => {
    const obtenerEmpleado = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/empleados/${id}`); // Realiza una solicitud GET para obtener los detalles del empleado
        setEmpleado(response.data); // Actualiza el estado con los detalles del empleado obtenidos del servidor
      } catch (error) {
        console.error('Error al obtener el empleado:', error); // Muestra un mensaje de error en la consola si ocurre un error al obtener los detalles del empleado
      }
    };

    obtenerEmpleado(); // Ejecuta la función para obtener los detalles del empleado
  }, [id]); // El efecto se ejecuta cada vez que cambia el ID del empleado

  // Si los datos del empleado están cargando, muestra un mensaje de carga
  if (!empleado) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles del Empleado</h2>
      {/* Muestra los detalles del empleado */}
      <p>
        <strong>Nombre:</strong> {empleado.nombre}
      </p>
      <p>
        <strong>Email:</strong> {empleado.email}
      </p>
      <p>
        <strong>Rol:</strong> {empleado.rol}
      </p>
      {/* Link para redirigir a la página de edición del empleado */}
      <Link to={`/empleados/${id}/editar`} className="btn green">
        Editar
      </Link>
      <div className="center-align">
        <button type="submit" className="btn green">
          Actualizar
        </button>
        {/* Link para redirigir a la página de lista de empleados */}
        <Link to="/empleados" className="btn red" style={{ marginLeft: '10px' }}>
          Ir a Lista
        </Link>
      </div>
    </div>
  );
};

export default DetallesEmpleado;



