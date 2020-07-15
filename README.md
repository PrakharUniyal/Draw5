# pmcBucket

## Setup for service package
1. Clone the repository
```
git clone git@github.com:PrakharUniyal/Draw5.git
```
2. Install node modules
```
npm install
```
After this, use app.js to run the service on [localhost:3000](https://localhost:3000) and sudo mongod on another terminal to create and connect with a local mongo database.
```
nodemon app
```
```
sudo mongod
```

# List of Features:

User signup:
Store user info in the 'user' database and create a face crop of user and store in file storage folder 'users'.

Member signup:
Store member info in 'member' database.

Member Login/Upload:
Allow members to upload single photo(for now), scan it for faces and match them with the ones in 'users' folder for identification and then store the matched ids in the 'face' database and photos in 'photos' file storage folder.

User Login/Home Page:
Find the list of photos of the user from 'face' database and use it to display those photos from 'photos' file storage folder.
