const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes')
const cors = require('cors')
const mongoose = require('mongoose')
const signin = require('./routes/signin');
const signup = require('./routes/signup');
const question = require('./routes/question')
const user = require('./routes/user')

require('dotenv').config()
mongoose.connection.openUri(process.env.DATABAS, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
  console.log('mongoose connection success');
}).on('error', (error) => {
  console.log('connection error', error);
})

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/signin', signin)
app.use('/api/signup', signup)
app.use('/api/questions', question)
app.use('/api/users', user)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler


module.exports = app;