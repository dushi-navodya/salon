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

module.exports = Route;