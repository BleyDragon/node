import { Link, useNavigate } from 'react-router-dom'; // Importación de Link y useNavigate para la navegación entre rutas
import React, { useEffect } from 'react'; // Importación de React y useEffect para el manejo de efectos secundarios
import axios from 'axios'; // Importación de Axios para realizar solicitudes HTTP

const ListaEmpleados = ({ empleados, obtenerEmpleados }) => {
  const navigate = useNavigate(); // Hook useNavigate para la navegación entre rutas
  
  // Función para eliminar un empleado
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/empleados/${id}`); // Realiza una solicitud DELETE para eliminar el empleado con el ID proporcionado
      alert('Empleado eliminado exitosamente'); // Muestra una alerta indicando que el empleado se eliminó correctamente
      obtenerEmpleados(); // Actualiza la lista de empleados después de eliminar uno
      navigate('/empleados'); // Redirecciona a la página de empleados
    } catch (error) {
      console.error('Ha ocurrido un error inesperado', error); // Muestra un mensaje de error en la consola si ocurre un error al eliminar el empleado
    }
  };

  // Efecto para obtener la lista de empleados al montar el componente
  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <ul className="collection">
        {/* Mapea la lista de empleados y muestra cada uno */}
        {empleados.map((empleado) => (
          <li key={empleado._id} className="collection-item">
            <strong>Nombre:</strong>
            {/* Link para redirigir a la página de detalles del empleado */}
            <Link to={`/empleados/${empleado._id}`}>{empleado.nombre}</Link>
            <br />
            <strong>Email:</strong> {empleado.email}
            <br />
            <strong>Rol:</strong> {empleado.rol}
            <br />
            {/* Botón para eliminar un empleado */}
            <button className="btn green" onClick={() => handleDelete(empleado._id)}>
              eliminar
            </button>
          </li>
        ))}
      </ul>
      {/* Link para redirigir a la página de registro de nuevo empleado */}
      <Link to="/" className="btn red" style={{ marginLeft: '10px' }}>
        Nuevo Registro
      </Link>
    </div>
  );
};

export default ListaEmpleados;

