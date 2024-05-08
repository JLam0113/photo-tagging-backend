var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let dotenv = require('dotenv').config()
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');

var app = express();

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://" + dotenv.parsed.USERNAME + ":" + dotenv.parsed.PASSWORD + "@cluster0.y2sspz1.mongodb.net/phototag?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({error: err});
});

module.exports = app;
