// using passport for authentication of the users

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const emp = require('../models/employee');

// creating a new strategy

passport.use(new LocalStrategy({
    usernameField: 'username',
},function(username,password,done){
    emp.findOne({username: username},function(err,empl){
        if(err){
            console.log(err);
            return done(err);
        }
        if(!empl || empl.password!=password){
            console.log("Invalid Username/Password");
            return done(null,false);
        }
        
        return done(null,empl);
    })
}))


passport.serializeUser(function(empl,done){
    
    done(null, empl.id)
})

passport.deserializeUser(function(id, done){
    
    emp.findById(id,function(err,empl){
        if(err){
            console.log(err);
            return done(err);
        }
        
        return done(null, empl)
    })
})

passport.checkAuthentication = async function(req,res,next){
    if(await req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
}

passport.setAuthenticatedUser = async function(req,res,next){
    if(await req.isAuthenticated()){
        res.locals.empl = req.user;
    }
    
    next()
}

module.exports = passport;