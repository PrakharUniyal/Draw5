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

module.exports = function(app,db) {
    app.post('/userSignup', upload.single('avatar'), function (req, res, next) {
        var email = req.body.email;
        var pass = req.body.pass;
        var data = {
            "email": email,
            "password": pass,
        }

        db.collection('users').insertOne(data, function (err, collection) {
            if (err) throw err;
            console.log("Record inserted:"+email+" | "+pass);
        });
        res.send('User registered!');
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
    });
}