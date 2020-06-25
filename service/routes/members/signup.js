module.exports = function (app,db) {
    app.post('/memberSignup', function (req, res) {
        var email = req.body.email;
        var pass = req.body.pass;
        var data = {
            "email": email,
            "password": pass,
        }

        db.collection('members').insertOne(data, function (err, collection) {
            if (err) throw err;
            console.log("Record inserted:" + email + " | " + pass);
        });
        res.send('Member registered!');
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
    });
}