var Sequelize = require('sequelize');
var sequelize = require('./../sequelizedb');
var UserGroup = require('./userGroups');

var User = sequelize.define('users',{
    id : {type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true},
    firstName : {type : Sequelize.STRING, allowNull:false},
    lastName : {type : Sequelize.STRING, allowNull : false},
    password : {type : Sequelize.STRING, allowNull : false},
    email : {type : Sequelize.STRING, allowNull : false},
    userGroupID : { type: Sequelize.INTEGER, references : {model : UserGroup, key:'id'}, allowNull :false}    
});







module.exports = User;