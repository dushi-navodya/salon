var Stylists = require('../models/stylists')
var express  = require('express');
var Route = express();
var sequelize = require('../sequelizedb');
var bodyParser = require('body-parser');

Route.get('/', function(req, res){
    res.send("awaaaaaaaa");
});

Route.get('/getAllStylists', function(req, res){
    Stylists.findAll().then(stylists => {
        console.log(stylists)
        res.json(stylists);
      }).catch(function(err){
          res.sendStatus(500);
      })
});
var getStylistByJob = "SELECT u.firstName, u.lastName, s.id, s.isStylist, s.isEducator, s.experience ,s.stylistRate, s.educatorRate, s.bio, s.image" +
                     " FROM users u, stylists s where (isStylist= :isStylist OR isEducator= :isEducator) AND u.id =s.userID";

Route.get('/getFreelancerByJob', function(req, res){
    sequelize.query(getStylistByJob, {replacements :{isStylist:req.query.isStylist,isEducator : req.query.isEducator}, type: sequelize.QueryTypes.SELECT}). then(stylists => {
        res.json(stylists);
      }).catch(function(err){
          res.sendStatus(500);
      })
});
var getStylistById = "SELECT u.firstName, u.lastName, s.id, s.isStylist, s.isEducator, s.experience ,s.stylistRate, s.educatorRate, s.bio, s.image" +
                     " FROM users u, stylists s where s.id = :id and u.id = s.userID";
Route.get('/getstylistById', function(req, res){
    sequelize.query(getStylistById, {replacements :{id : req.query.id}, type: sequelize.QueryTypes.SELECT}).then(stylist => {
        res.json(stylist);
      }).catch(function(err){
        //   res.sendStatus(500);
        console.log(err)
      })
});

var getAvailableStylistsByDateSessionQuery = "SELECT u.firstName, u.lastName, s.id, s.isStylist, s.isEducator, s.experience ,s.stylistRate, s.educatorRate, s.bio, s.image"+
                    " FROM users u, stylists s, stylist_calendars sc "+
                                "where u.id=s.userID and s.id=sc.stylistID and "+ 
                                "date= :date and isAvailable=1 and workingSessionID= :sessionId";

Route.get('/getAvailableStylistByDateSession', function(req, res){
    sequelize.query(getAvailableStylistsByDateSessionQuery, {replacements :{date :req.query.date, sessionId: req.query.sessionId}, type: sequelize.QueryTypes.SELECT}).then(stylists => {
        res.json(stylists);
      }).catch(function(err){
        //   res.sendStatus(500);
        console.log(err)
      })
});

var getAvailableStylistsByJobDate = "SELECT u.firstName, u.lastName, s.id,,s.experience, s.bio,"+ 
                                       " s.stylistRate, s.educatorRate,s.image"+
                                        " FROM stylist_calendars sc , stylists s, users u"+
                                       " where sc.date=:date  and sc.isAvailable=1 "+
                                       " and (s.isStylist=:isStylist or s.isEducator=:isEducator)"+
                                        " and u.id = s.userID"+
                                        " and s.id=sc.stylistID";

Route.get('/getAvailableStylistsByJobDate', function(req, res){
    sequelize.query(getAvailableStylistsByJobDate, {replacements :{date :req.query.date, isStylist : req.query.isStylist, isEducator : req.query.isEducator}, 
        type: sequelize.QueryTypes.SELECT}).then(stylists => {
        res.json(stylists);
      }).catch(function(err){
        // res.json(err);
          res.sendStatus(500);
      })
});

var getAvailableStylistsByJobPrice = "SELECT u.firstName, u.lastName, s.id,s.experience, s.bio,"+ 
                                       " s.stylistRate, s.educatorRate,s.image"+
                                        " FROM stylist_calendars sc , stylists s, users u"+
                                       " where sc.isAvailable=1 "+
                                       " and (s.isStylist=:isStylist or s.isEducator=:isEducator)"+
                                        " and u.id = s.userID"+
                                        " and s.id=sc.stylistID and (s.stylistRate< :max and s.stylistRate> :min)";

Route.get('/getAvailableStylistsByJobPrice', function(req, res){
    sequelize.query(getAvailableStylistsByJobPrice, {replacements :{max :req.query.max, min: req.query.min, isStylist : req.query.isStylist, isEducator : req.query.isEducator}, 
        type: sequelize.QueryTypes.SELECT}).then(stylists => {
        res.json(stylists);
      }).catch(function(err){
        res.json(err);
        //   res.sendStatus(500);
      })
});

var getAvailableStylistsByDateQuery = "SELECT u.firstName, u.lastName, s.id, s.isStylist, s.isEducator, s.experience ,s.stylistRate, s.educatorRate, s.bio, s.image"+
                                " FROM users u, stylists s, stylist_calendars sc "+
                                "where u.id=s.userID and s.id=sc.stylistID and "+ 
                                "date= :date and isAvailable=1";

Route.get('/getAvailableStylistByDate', function(req, res){
    sequelize.query(getAvailableStylistsByDateQuery, {replacements :{date :req.query.date}, type: sequelize.QueryTypes.SELECT}).then(stylists => {
        res.json(stylists);
      }).catch(function(err){
        //   console.log(err)
          res.sendStatus(500);
      })
});

var getAvailableStylistsBySessionQuery = "SELECT u.firstName, u.lastName, s.id, s.isStylist, s.isEducator, s.experience ,s.stylistRate, s.educatorRate, s.bio, s.image"+
                                " FROM users u, stylists s, stylist_calendars sc  "+
                                "where u.id=s.userID and s.id=sc.stylistID and workingSessionID= :sessionId and isAvailable=1";

Route.get('/getAvailableStylistBySession', function(req, res){
    sequelize.query(getAvailableStylistsBySessionQuery, {replacements :{sessionId :req.query.sessionId}, type: sequelize.QueryTypes.SELECT}).then(stylists => {
        res.json(stylists);
      }).catch(function(err){
          res.sendStatus(500);
      })
});

var getAvailableStylistByPriceQuery = "sSELECT u.firstName, u.lastName, s.id, s.isStylist, s.isEducator, s.experience ,s.stylistRate, s.educatorRate, s.bio, s.image"+
                                        " FROM users u, stylists s, stylist_calendars sc "
                                        +"where s.id = sc.stylistID and u.id=s.userID and s.isStylist=1 "
                                        +"and s.stylistRate< :max and s.stylistRate> :min";

Route.get('/getAvailableStylistByPrice', function(req, res){
    sequelize.query(getAvailableStylistByPriceQuery, {replacements :{max :req.query.max, min: req.query.min}, type: sequelize.QueryTypes.SELECT}).then(stylists => {
        res.json(stylists);
      }).catch(function(err){
          res.sendStatus(500);
      })
});



Route.post('/save', function(req, res){
    Stylists.create(req.body).then(stylist =>{    
        res.json(stylist);     
    }).catch(function(err){
        res.json(err);
    })
});

module.exports = Route;