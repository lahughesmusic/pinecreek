const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
// const passport = require('passport');

const users = require('./routes/api/users');
const posts = require('./routes/api/post');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// DB Config

const db = require('./config/key').mongoURI;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
// require('./config/passport')(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/post', posts);

//Server static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
 });
}




const port = process.env.PORT || 2000;


app.listen(port, () => console.log(`Server running on port ${port}`));

 