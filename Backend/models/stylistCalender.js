var Sequelize = require('sequelize');
var sequelize = require('./../sequelizedb');
var Stylist = require('./stylists');
var WorkingSession = require('./workingSessions');

const StylistCalender = sequelize.define('stylist_calendars', {
    id : {type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true},
    date : {type : Sequelize.DATE},    
    stylistID : {type : Sequelize.INTEGER, references : {model : Stylist, key : 'id'}},
    isAvailable : {type: Sequelize.BOOLEAN},
    workingSessionID : {type : Sequelize.INTEGER, references : {model : WorkingSession, key:'id'}}    
});

module.exports = StylistCalender;