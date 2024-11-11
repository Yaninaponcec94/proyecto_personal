const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database');  // Importar la configuración de la base de datos
const userRoutes = require('./routes/userRoutes');  // Importar las rutas de usuario
const { validationResult } = require('express-validator');

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Usar las rutas de usuario
app.use('/api', userRoutes);  // Prefijo "/api" para las rutas de usuario

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.ejs');
});

// Conexión a la base de datos MySQL con Sequelize y sincronización
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos MySQL exitosa');
    return sequelize.sync();  // Esto creará las tablas si no existen
  })
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
