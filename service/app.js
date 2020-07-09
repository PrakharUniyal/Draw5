var express = require('express');
var bodyParser = require('body-parser');
var multer  =   require('multer');
const {spawn} = require('child_process');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

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

//File Upload
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');


app.post('/api/photo',function(req,res){

    upload(req,res,function(err) 
    {
        if(err) 
        {
            return res.end("Error uploading file.");
        }
        // res.end("File is uploaded");
    });
 
	var dataToSend;

	// spawn new child process to call the python script
	const python = spawn('python', ['script.py']);

	// collect data from script
	python.stdout.on('data', function (data) {
	console.log('Pipe data from python script ...');
	dataToSend = data.toString();
	});

	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
	console.log(`child process close all stdio with code ${code}`);

	// send data to browser
	res.send(dataToSend)
	});
 
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

app.listen(3000, () => console.log(`App listening on port 3000!`));