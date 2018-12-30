var Stylist = require('./../models/stylists');
var express  = require('express');
var stylistExport = express()

stylistExport.create = (req, res) =>
{
    let temp = req.body;
    var stylist = {
        experience : temp.experience
    }
    Stylists.create(stylist).then(stylist =>{    
        res.json(stylist);     
    }).catch(function(err){
        res.json(err);
    })
}

module.exports = stylistExport;
