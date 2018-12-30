var Sequelize = require('sequelize');
var sequelize = require('../sequelizedb');
var User = require('./users');


const SalonOwner = sequelize.define('salon_owners', {
    id : {type : Sequelize.INTEGER, primaryKey: true, autoIncrement : true},
    salon_name : {type : Sequelize.STRING, allowNull : false},
    employeeCount : {type : Sequelize.INTEGER, allowNull : true},
    image : {type : Sequelize.BLOB, allowNull : true},
    bio : {type : Sequelize.STRING, allowNull : true},
    userID : {type : Sequelize.INTEGER, references :{ model:User, key: 'id'}}
});

module.exports = SalonOwner;