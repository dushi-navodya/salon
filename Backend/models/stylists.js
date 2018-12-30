var Sequelize = require('sequelize');
var sequelize = require('./../sequelizedb');
var User = require('./users');

const Stylist = sequelize.define('stylists', {
    id: {type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true},
    experience : {type : Sequelize.INTEGER},
    bio : {type : Sequelize.STRING},
    isStylist : {type : Sequelize.BOOLEAN},
    isEducator : {type : Sequelize.BOOLEAN},
    stylistRate : {type : Sequelize.FLOAT},
    educatorRate : {type : Sequelize.FLOAT},
    image : {type : Sequelize.BLOB},
    userID : {type : Sequelize.INTEGER, references : {model : User, key : 'id'} }
  });



  


module.exports = Stylist;