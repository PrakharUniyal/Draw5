const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');

// Server settings
var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static(__dirname + 'public'));
app.use('/data', express.static('data'))
app.use(bodyParser.urlencoded({
    extended: true
}));

//Database
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

// Routes
require('./routes/routes.js')(app, db, multer);

app.listen(3000, () => console.log(`App listening on port 3000!`));