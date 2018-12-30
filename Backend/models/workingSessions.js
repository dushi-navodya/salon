var Sequelize = require('sequelize');
var sequelize = require('../sequelizedb');

const WorkingSession = sequelize.define('working_sessions', {
    id : {type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true},
    sessionName : {type : Sequelize.STRING, allowNull : false},
    starttime : {type : Sequelize.TIME, allowNull : false},
    endTime : {type : Sequelize.TIME, allowNull : false},    
  });

module.exports = WorkingSession;