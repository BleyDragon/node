const express = require('express');
const router = express.Router();
const Empleado = require('../modelos/empleado');

// Ruta para crear un nuevo empleado
router.post('/', async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body); // Crea una nueva instancia de Empleado con los datos recibidos en la solicitud
    await nuevoEmpleado.save(); // Guarda el nuevo empleado en la base de datos
    res.status(201).json(nuevoEmpleado); // Devuelve el nuevo empleado creado con el código de estado 201 (Created)
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: 'Error al crear el empleado' }); // Devuelve un mensaje de error y un código de estado 400 (Bad Request) si ocurre un error
  }
});

// Ruta para obtener todos los empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find(); // Busca todos los empleados en la base de datos
    res.json(empleados); // Devuelve la lista de empleados en formato JSON
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los empleados' }); // Devuelve un mensaje de error y un código de estado 500 (Internal Server Error) si ocurre un error
  }
});

// Ruta para obtener un empleado por su ID
router.get('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id); // Busca un empleado por su ID en la base de datos
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' }); // Devuelve un mensaje de error y un código de estado 404 (Not Found) si el empleado no se encuentra
    }
    res.json(empleado); // Devuelve el empleado encontrado en formato JSON
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el empleado' }); // Devuelve un mensaje de error y un código de estado 500 (Internal Server Error) si ocurre un error
  }
});

// Ruta para actualizar un empleado por su ID
router.put('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Busca y actualiza un empleado por su ID en la base de datos
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' }); // Devuelve un mensaje de error y un código de estado 404 (Not Found) si el empleado no se encuentra
    }
    res.json(empleado); // Devuelve el empleado actualizado en formato JSON
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el empleado' }); // Devuelve un mensaje de error y un código de estado 500 (Internal Server Error) si ocurre un error
  }
});

// Ruta para eliminar un empleado por su ID
router.delete('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id); // Busca y elimina un empleado por su ID en la base de datos
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' }); // Devuelve un mensaje de error y un código de estado 404 (Not Found) si el empleado no se encuentra
    }
    res.json({ mensaje: 'Empleado eliminado correctamente' }); // Devuelve un mensaje de éxito si el empleado se elimina correctamente
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el empleado' }); // Devuelve un mensaje de error y un código de estado 500 (Internal Server Error) si ocurre un error
  }
});

module.exports = router; // Exporta el router con las rutas definidas
