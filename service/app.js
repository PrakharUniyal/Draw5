var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'users/');
  },
  filename: function(req, file, cb) {
    var id = req.body.email.split('@')[0];
    cb(null, id + '.jpg');
  }
});
var upload = multer({ storage: storage });

app.get('/',function(req,res) {
    res.sendFile('index.html',{root:'./views'});
});

app.get('/userHome',function(req,res) {
    res.sendFile('index.html',{root:'./views/user'});
});

app.get('/memberHome',function(req,res) {
    res.sendFile('index.html',{root:'./views/member'});
});

app.post('/userSignup', upload.single('avatar'), function (req, res, next) {
    res.send('Registered!')
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

app.listen(3000);