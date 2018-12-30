var UserGroup = require('../models/userGroups')
var express  = require('express');
var Route = express();


Route.get('/', function(req, res){
    res.send("awaaaaaaaa");
});

Route.get('/getAllUserGroups', function(req, res){
    UserGroup.findAll().then(userGroups => {
        res.json(userGroups);
      }).catch(function(err){
          res.sendStatus(500);
      })
});

Route.get('/getUserGroup/:id', function(req, res){
    UserGroup.findById(req.params.id).then(userGroup => {
        res.json(userGroup);
      }).catch(function(err){
          res.sendStatus(500);
      })
});

module.exports = Route;

