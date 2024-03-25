// express
const express = require('express');

// various middlewares
const sassMiddleware = require('node-sass-middleware');
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')
const compression = require('compression')

// db
const mongoose = require('mongoose')

// other
const createError = require('http-errors');
const path = require('path');
const asyncErrorHandler = require("./utils/asyncErrorHandler");
const debug = require('debug')
// const { validationResult, body } = require("express-validator")

// routes
const indexRouter = require('./routes/index');
const inventoryRouter = require('./routes/inventory/inventory')

const requestsDebug = debug('inventory-app:reqests')
const dbDebug = debug('inventory-app:db')

const app = express();

const dbURI = process.env.MONGO_URI || ''
mongoose
  .connect(dbURI)
  .then(success => dbDebug('connected'))
  .catch(err => dbDebug("Failed to connect:", err.message))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  requestsDebug(req.method, req.originalUrl)
  next()
})

// set rate limits
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 80,
});
app.use(limiter);

app.use(compression())
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "fakestoreapi.com"],
      },
    },
  })
);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(sassMiddleware({
  src: path.join(__dirname, 'scss'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/inventory', inventoryRouter)

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
