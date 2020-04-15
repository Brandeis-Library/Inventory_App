//Importing of downloaded packages.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require("cors");

// imported files - these are all route files
const indexRouter = require('./routes/index');
const updateItemRouter = require('./routes/updateItemAPI');
const retreiveItemRouter = require("./routes/retreiveItemAPI");
const updateInventoryDateRouter = require("./routes/updateInventoryDateAPI");
const retreiveHoldingsRouter = require('./routes/holdingsDataAPI');

// Instantiating the express application.
const app = express();

// view engine setup - not used in the application.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware packages implemented
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// List of available routes
app.use('/', indexRouter);
app.use('/updateItem', updateItemRouter);
app.use("/retreiveItem", retreiveItemRouter);
app.use("/updateItemInventoryDate", updateInventoryDateRouter);
app.use("/holdingsData", retreiveHoldingsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
