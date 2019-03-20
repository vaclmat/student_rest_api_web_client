/*eslint-env node */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var sservicesRouter = require('./routes/sservices');
var uservicesRouter = require('./routes/uservices');
var ByIDRouter = require('./routes/ByID');
var logoutRouter = require('./routes/logout');
var getAllRouter = require('./routes/getAll');
var ByUserNameRouter = require('./routes/ByUserName');
var deletesRouter = require('./routes/deletesByID');
var deleteuRouter = require('./routes/deleteByUserName');
var createsRouter = require('./routes/creates');
var createuRouter = require('./routes/createu');
var createsresRouter = require('./routes/createsresult');
var updatesRouter = require('./routes/updates');
var updatesresRouter = require('./routes/updatesresult');
var updateuRouter = require('./routes/updateu');
var updateuresRouter = require('./routes/updateuresult');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user/login', loginRouter);
app.use('/user/services', uservicesRouter);
app.use('/student/services', sservicesRouter);
app.use('/student/ByID', ByIDRouter);
app.use('/user/logout', logoutRouter);
app.use('/students/getAll', getAllRouter);
app.use('/user/ByUserName', ByUserNameRouter);
app.use('/student/deleteByID', deletesRouter);
app.use('/user/deleteByUserName', deleteuRouter);
app.use('/student/create', createsRouter);
app.use('/user/create', createuRouter);
app.use('/student/createresult', createsresRouter);
app.use('/student/update', updatesRouter);
app.use('/student/updateresult', updatesresRouter);
app.use('/user/update', updateuRouter);
app.use('/user/updateresult', updateuresRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
