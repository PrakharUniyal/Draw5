module.exports = function (app,db,multer) {
    
    // Homepage
    app.get('/', function (req, res) {
        res.sendFile('index.html', {
            root: './views'
        });
    });

    // User Homepage
    app.get('/userHome', function (req, res) {
        res.sendFile('index.html', {
            root: './views/user'
        });
    });

    // Member Homepage
    app.get('/memberHome', function (req, res) {
        res.sendFile('index.html', {
            root: './views/member'
        });
    });

    // Signup/Login POST routes
    require('./users/signup')(app, db, multer);
    require('./members/signup')(app, db);

    // Photo upload route for member
    require('./members/upload')(app,db,multer);

}