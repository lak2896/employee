// controllers for different routes



const User = require('../models/employee');


const { serializeUser } = require("passport");
const { findByIdAndUpdate } = require("../models/employee");


// function to create sessions for users

module.exports.createSession = function(req,res){
    return res.redirect('/')
}

//function to destry sessions created by the users
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/signin')
}




//feedback function for the employees

module.exports.feedback= function(req,res){
    let emp= User.findByIdAndUpdate(req.params.id,{feedback:req.body.feed},function(err,user){
         if(err){
             console.log(err);
         }
    
     });
    

}