var StylistCalender = require('../models/stylistCalender')
var express  = require('express');
var Route = express();
var sequelize = require('../sequelizedb');
var bodyParser = require('body-parser')

var getAvailableDates = "Select ws.sessionName, sc.workingSessionID, s.isStylist, s.isEducator, s.stylistRate, s.educatorRate, sc.id from stylists s, stylist_calendars sc, working_sessions ws"+
                    " where s.id=:id and s.id = sc.stylistID and sc.isAvailable=1 and sc.date=:date and sc.workingSessionID= ws.id"

Route.get('/getAvailableSession', function(req, res){
    sequelize.query(getAvailableDates, {replacements :{id : req.query.id, date: req.query.date}, type: sequelize.QueryTypes.SELECT}). then(dates => {
        res.json(dates);
      }).catch(function(err){
          res.json(err)
      })
});

var getUnavailableDates = "Select sc.date from stylists s, stylist_calendars sc"+
                    " where s.id=:id and s.id = sc.stylistID and sc.isAvailable=0"

Route.get('/getUnavailableDates', function(req, res){
    sequelize.query(getUnavailableDates, {replacements :{id : req.query.id}, type: sequelize.QueryTypes.SELECT}). then(dates => {
        res.json(dates);
      }).catch(function(err){
          res.json(err)
      })
});

Route.get('/changeAvalableStatus', function(req, res){
    console.log(req.query)
    StylistCalender.findOne({where : {id : req.query.id}}).then(calandar=>{
        console.log(calandar.isAvailable)
        calandar.update({
            isAvailable:false
        }).then({

        })
    })
});

module.exports = Route;