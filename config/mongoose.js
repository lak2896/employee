
// seeting up database using mongodb
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lak2896:12345@cluster0.92kkk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting To Database"));

db.once('open',function(){
    console.log("Database Successfully Connected");
});

//mongodb+srv://lak2896:12345@cluster0.92kkk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority