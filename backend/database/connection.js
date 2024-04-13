const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cruddb', 'root', 'Lsd@5030', {
  host: 'localhost',
  dialect: 'mysql', // Change to 'postgres' for PostgreSQL, 'sqlite' for SQLite, etc.
});

module.exports = sequelize;

