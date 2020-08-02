// //File Upload (TODO refactoring)
// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './uploads');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname);
//     }
// });
// var upload = multer({
//     storage: storage
// }).single('userPhoto');


// //joining path of directory 
// const directoryPath = path.join(__dirname, 'data/filter_images');

// app.post('/api/photo', function (req, res, next) {
//     upload(req, res, function (err) {
//         if (err) {
//             return res.end("Error uploading file.");
//         }
//     });

//     var dataToSend;
//     const python = spawn('python3', ['script.py']);
//     python.stdout.on('data', function (data) {
//         console.log('Pipe data from python script ...');
//         dataToSend = data.toString();
//     });

//     // in close event we are sure that stream from child process is closed
//     python.on('close', (code) => {
//         console.log(`child process close all stdio with code ${code}`);

//         //getting filtered images
//         var img = [];
//         fs.readdir(directoryPath, function (err, files) {
//             //handling error
//             if (err) {
//                 return console.log('Unable to scan directory: ' + err);
//             }
//             //listing all files using forEach
//             files.forEach(function (file) {
//                 // Do whatever you want to do with the file
//                 // console.log(file); 
//                 img.push(file);
//             });
//             console.log(img, "1");

//             res.render('search.ejs', {
//                 root: './views',
//                 images: img
//             });
//         });

//     });

// });
