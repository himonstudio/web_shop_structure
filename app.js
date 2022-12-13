var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



// thêm thư viện mongoose để kết nối vớ mongodb
const mongoose = require('mongoose');
// kết nối mongodb
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://revolution:revolution@webshop.dfvjvmc.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
//Bắt sự kiện error
db.on('error', function(err) {
  if (err) console.log(err)
});
//Bắt sự kiện open
db.once('open', function() {
  console.log("Kết nối database thành công !");
});



var indexRouter = require('./routes/index.routes');
var adminRouter = require('./routes/admin.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
