var StylistBooking = require('../models/booking')
var express  = require('express');
var Route = express();
var sequelize = require('../sequelizedb');
var bodyParser = require('body-parser')

Route.post('/bookCalendar', function(req, res){
    console.log(req.body);
    StylistBooking.create(req.body).then(booiking =>{    
        res.json(booiking);     
    }).catch(function(err){
        res.json(err);
    })
});

getBookings = "SELECT sc.date, ws.sessionName, so.salon_name"+
                " from stylists s,salon_owners so,stylist_calendars sc, stylist_bookings sb, working_sessions ws"+
                " WHERE sb.stylistCalendarID=sc.id and sb.salownOwnerID=so.id and  sc.stylistID=s.id and sc.workingSessionID=ws.id"+
                " and sc.stylistID =:id"

Route.get('/getBookings', function(req, res){
    sequelize.query(getBookings, {replacements :{id : req.query.id}, type: sequelize.QueryTypes.SELECT}). then(dates => {
        res.json(dates);
      }).catch(function(err){
          res.json(err)
      })
});

module.exports = Route;