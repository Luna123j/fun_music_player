const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const musicRouter = require('./routes/music');
const lyricsRouter = require('./routes/lyrics');
const searchByLyricsRouter = require('./routes/searchByLyrics');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name:'session',
  keys:['wesley', 'jenny']
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/music', musicRouter);
app.use('/lyrics', lyricsRouter);
app.use('/searchByLyrics', searchByLyricsRouter);


module.exports = app;
