module.exports = function(app,db,multer) {

    // Photo storage configurations for multer
    var upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'storage/photos/');
            },
            filename: function (req, file, cb) {
                var id = Date.now().toString();
                cb(null, id + '.jpg');
            }
        })
    });

    // User signup
    app.post('/photoUpload', upload.single('avatar'), function (req, res, next) {
        
        //Face detection part goes here.
        

        db.collection('face').insertOne(data, function (err, collection) {
            if (err) throw err;
        });

        res.send('Uploaded!');
    });

}