var Sequelize = require('sequelize');
var sequelize = require('./../sequelizedb');

const UserGroup = sequelize.define('user_groups',{
    id : {type : Sequelize.INTEGER, primaryKey : true, autoIncrement: true},
    groupName : {type : Sequelize.STRING, allowNull:false},
});

module.exports = UserGroup;



