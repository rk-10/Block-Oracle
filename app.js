var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

// connection with mongodb
const mongoUri = config.mongoUri;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri)
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

require('./models/model_1');

var index = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

module.exports = app;
