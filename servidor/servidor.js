// Importación de los módulos necesarios
const express = require('express'); // Express: framework de Node.js para crear aplicaciones web
const mongoose = require('mongoose'); // Mongoose: biblioteca de modelado de objetos MongoDB para Node.js
const cors = require('cors'); // CORS: middleware para permitir solicitudes de recursos de diferentes orígenes

// Importación de las rutas definidas para los empleados
const empleadosRoutes = require('./rutas/empleados');

// Creación de una aplicación Express
const app = express();
const puerto = 5000; // Puerto en el que se ejecutará el servidor

// Middleware para el manejo de datos en formato JSON
app.use(express.json());

// Middleware para habilitar el intercambio de recursos entre diferentes orígenes
app.use(cors());

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://localhost/registro_empleados', {
  useNewUrlParser: true, // Opciones de configuración para la conexión
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a la base de datos')) // Mensaje de éxito si la conexión es exitosa
  .catch((error) => console.error('Error al conectar a la base de datos:', error)); // Mensaje de error si la conexión falla

// Definición de las rutas para los empleados
app.use('/api/empleados', empleadosRoutes);

// Iniciar el servidor y escuchar peticiones en el puerto especificado
app.listen(puerto, () => {
    console.log(`Servidor backend ejecutándose en el puerto ${puerto}`);
});
