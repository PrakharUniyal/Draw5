var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/draw5', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log("connection succeeded!");
});



app.get('/',function(req,res) {
    res.sendFile('index.html',{root:'./views'});
});

app.get('/userHome',function(req,res) {
    res.sendFile('index.html',{root:'./views/user'});
});

app.get('/memberHome',function(req,res) {
    res.sendFile('index.html',{root:'./views/member'});
});

require('./routes/users/signup')(app,db);
require('./routes/members/signup')(app,db);

app.listen(3000);