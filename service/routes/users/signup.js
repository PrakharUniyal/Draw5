module.exports = function(app,db,multer) {
    
    // Photo storage configurations for multer
    var upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'storage/users/');
            },
            filename: function (req, file, cb) {
                var id = req.body.email.split('@')[0];
                cb(null, id + '.jpg');
            }
        })
    });

    // User signup
    app.post('/userSignup', upload.single('avatar'), function (req, res, next) {
        var email = req.body.email;
        var pass = req.body.pass;
        var data = {
            "email": email,
            "password": pass,
            "face": req.body.email.split('@')[0]
        }

        db.collection('user').insertOne(data, function (err, collection) {
            if (err) throw err;
            console.log("Record inserted:"+email+" : "+pass);
        });

        res.send('User registered!');
    });

}