var Sequelize = require('sequelize');
var sequelize = require('./../sequelizedb');
var StylistCalendar = require('./stylistCalender');
var WorkingSession = require('./workingSessions');
var SalonOwner = require('./salonOwners')

const Booking = sequelize.define('stylist_booking', {
    id : {type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true},
    stylistCalendarID : {type : Sequelize.INTEGER, references : {model : StylistCalendar, key : 'id'}},
    salownOwnerID : {type : Sequelize.INTEGER, references : {model : SalonOwner, key : 'id'}}
});

module.exports = Booking;