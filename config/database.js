const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pruebaProyecto', 'root', 'root', {
  host: 'localhost', 
  dialect: 'mysql',
});

module.exports = sequelize;
