import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Importación de componentes de enrutamiento de React Router
import React, { useEffect, useState } from 'react'; // Importación de React y useState para manejar el estado
import axios from 'axios'; // Importación de Axios para realizar solicitudes HTTP
import 'materialize-css/dist/css/materialize.min.css'; // Importación de estilos de Materialize CSS
import ListaEmpleados from './componentes/ListaEmpleados'; // Importación de componente ListaEmpleados
import RegistroEmpleado from './componentes/RegistroEmpleado'; // Importación de componente RegistroEmpleado
import DetallesEmpleado from './componentes/DetallesEmpleado'; // Importación de componente DetallesEmpleado
import EditarEmpleado from './componentes/EditarEmpleado'; // Importación de componente EditarEmpleado
import logo from './assets/logo.png'

function App() {
  const [empleados, setEmpleados] = useState([]); // Estado para almacenar la lista de empleados

  // Efecto para obtener la lista de empleados al montar el componente
  useEffect(() => {
    obtenerEmpleados();
  }, []);

  // Función para obtener la lista de empleados desde el servidor
  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/empleados'); // Realiza una solicitud GET para obtener la lista de empleados
      setEmpleados(response.data); // Actualiza el estado con la lista de empleados recibida del servidor
    } catch (error) {
      console.error('Error al obtener los empleados:', error); // Muestra un mensaje de error en la consola si ocurre un error al obtener los empleados
    }
  };

  // Función para actualizar la lista de empleados después de agregar, editar o eliminar un empleado
  const actualizarListaEmpleados = () => {
    obtenerEmpleados();
  };

  return (
    <BrowserRouter> {/* Envuelve la aplicación con BrowserRouter para habilitar el enrutamiento */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="container white" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
      </div>
      
          <h1 className="center-align" style={{ border: '2px solid #4CAF50', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '10px' }}>Registro de Usuario</h1>
            
          {/* Definición de las rutas utilizando el componente Routes */}
          <Routes>
            <Route path="/" element={<RegistroEmpleado actualizarListaEmpleados={actualizarListaEmpleados} />} /> {/* Ruta para el formulario de registro de empleado */}
            <Route path="/empleados" element={<ListaEmpleados empleados={empleados} obtenerEmpleados={obtenerEmpleados} />} /> {/* Ruta para la lista de empleados */}
            <Route path="/empleados/:id" element={<DetallesEmpleado />} /> {/* Ruta para ver los detalles de un empleado */}
            <Route path="/empleados/:id/editar" element={<EditarEmpleado />} /> {/* Ruta para editar un empleado */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;


