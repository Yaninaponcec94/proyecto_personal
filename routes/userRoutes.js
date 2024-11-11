const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const { body, validationResult } = require('express-validator');
const User = require('../models/user'); 

const router = express.Router();

// Middleware para validar los datos de la ruta POST /users
const validateUser = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
];

// Ruta para crear un usuario
router.post('/users', validateUser, createUser);

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

// Esta ruta `/data` parece ser innecesaria. Si necesitas otra ruta, ajusta su propósito.
router.post('/data', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Guarda los datos en la base de datos
    try {
        const { nombre, email } = req.body;
        const newUser = await User.create({ nombre, email });
        res.json({ message: 'Usuario creado correctamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
});
// Ruta para obtener los usuarios
router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll(); // O el método que uses para obtener datos de la BD
      res.json(users); // Envía los datos al cliente en formato JSON
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  });
  

module.exports = router;
