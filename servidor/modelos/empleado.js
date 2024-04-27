const mongoose = require('mongoose');

// Definición del esquema de empleado utilizando Mongoose
const empleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true, // El nombre es obligatorio
  },
  email: {
    type: String,
    required: true, // El email es obligatorio
    unique: true, // El email debe ser único en la base de datos
  },
  rol: {
    type: String,
    required: true, // El rol es obligatorio
  },
});

// Creación del modelo Empleado a partir del esquema definido
const Empleado = mongoose.model('Empleado', empleadoSchema);

// Exportación del modelo Empleado para poder utilizarlo en otras partes de la aplicación
module.exports = Empleado;

