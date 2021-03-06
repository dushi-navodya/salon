const Sequelize = require('Sequelize');
const sequelize = new Sequelize('salon_project', 'root', '',
{
    host : 'localhost',
    dialect : 'mysql',
    operatorsAliases :false,
    pool : {
        max :10,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = sequelize;