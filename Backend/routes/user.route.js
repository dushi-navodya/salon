var User = require('../models/users')
var express  = require('express');
var Route = express();
var sequelize = require('../sequelizedb');

Route.get('/', function(req, res){
    res.send("awaaaaaaaa");
});

Route.get('/getAllUSers', function(req, res){
    User.findAll().then(user => {
        res.json(user);
      }).catch(function(err){
          res.sendStatus(500);
      })
});


Route.get('/getUser/:id', function(req, res){
    User.findById(req.params.id).then(user => {
        res.json(user);
      }).catch(function(err){
          res.sendStatus(500);
      })
});
var getUserByEmail ="SELECT * FROM users where email= :email"
Route.get('/getUser', function(req, res){
    sequelize.query(getUserByEmail, {replacements :{email : req.query.email}, type: sequelize.QueryTypes.SELECT}).then(user => {
        res.json(user);
      }).catch(function(err){
        //   res.sendStatus(500);
        res.json(err)
      })
});

Route.post('/register', function(req, res){
    console.log(req.body);
    User.create(req.body).then(user =>{    
        res.json(user);     
    }).catch(function(err){
        res.json(err);
    })
});




module.exports = Route;

