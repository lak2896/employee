// Importing all the librarries

const express = require('express');

const path = require('path');

// defining port no
const port = 8000;

const app = express();

// setting up monogdb database
const db = require('./config/mongoose')

const repository = require('./models/employee');

const session = require('express-session');
const passport = require('passport');

const passportLocal = require('./config/passport-local');

const MongoDbStore = require('connect-mongo');

// view engine 
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

// defining path for static files like css & images
app.use(express.static('assets/css'));

app.use(express.static('views'));

app.set('view-engine','ejs');

app.set('views','./views');

// using session cookie

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'employee_details',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoDbStore.create({
        mongoUrl: 'mongodb+srv://lak2896:12345@cluster0.92kkk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        mongooseConnection:db,
        autoRemove: 'disabled'
    },function(err){
        console.log("error ",err);
    })
}));

// initializing passport cookie

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));

// express listening to the port and returning
app.listen(port,function(err){
    if(err){
        console.log("Error In Running The Server!");
        return;
    }
    console.log("Server Running!");
})