var express = require('express');
var bodyParser = require('body-parser');
var multer  =   require('multer');
const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');

var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static(__dirname+'public'));
app.use('/data', express.static('data'))
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


//joining path of directory 
const directoryPath = path.join(__dirname, 'data/filter_images');

app.post('/api/photo',function(req,res,next){

	//First uploading photo of user
    upload(req,res,function(err) 
    {
        if(err) 
        {
            return res.end("Error uploading file.");
        }
        // res.end("File is uploaded");
    });
 
    //Python script to filter data images
	var dataToSend;
	// spawn new child process to call the python script
	const python = spawn('python3', ['script.py']);
	// collect data from script
	python.stdout.on('data', function (data) {
	console.log('Pipe data from python script ...');
	dataToSend = data.toString();
	});
	
  // in close event we are sure that stream from child process is closed
	python.on('close', (code) => 
  {
    console.log(`child process close all stdio with code ${code}`);

    //getting filtered images
    var img = [];
    fs.readdir(directoryPath, function (err, files) 
    {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      //listing all files using forEach
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          // console.log(file); 
          img.push(file);
      });
      console.log(img, "1");
    });

    console.log(img, "2"); 
    //show found images
    res.render('search.ejs',{root:'./views', images:img});
  	
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