'use strict';
process.chdir(__dirname);

// koa base
let koa = require('koa');
let app = koa();

// import middlewares
let favicon = require('koa-favicon');
let logger = require('koa-logger');
let serve = require('koa-static');
let route = require('koa-route');
let render = require('koa-ejs');
let etag = require('koa-etag');
let fresh = require('koa-fresh');
let gzip = require('koa-gzip');

// common stuff
let path = require('path');
let mongoose = require('mongoose');

// Controllers
let PageController = require('./controllers/PageController');
let PostController = require('./controllers/PostController');
let AuthController = require('./controllers/AuthController');

// Middlewares
let authenticate = require('./middlewares/AuthMiddleware');

// configs
let config = require('./config');
app.name = config.app.name || 'swiftwind';
app.env = process.env.NODE_ENV || 'development';
const port = config.app.port || process.env.PORT || 3000;
const dbUrl = config.db[app.env];

// render configs
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: ('development' !== app.env),
  debug: ('development' === app.env)
});

// connet database
mongoose.connect(dbUrl);

// use middlewares
app.use(gzip()); // compress the content
app.use(fresh()); // check whether to refresh the content based on the etag
app.use(etag()); // generate a etag
app.use(favicon(path.join(__dirname, 'public/favicon.ico'))); // middleware for serving a favicon
if ('development' === app.env) {
  app.use(logger()); // Development style logging middleware
}
app.use(serve(path.join(__dirname, 'public'), {maxage: ('production' === app.env) ? 24 * 60 * 60 * 1000 : 0})); // Static file server middleware

// routes, front-end
app.use(route.get('/', PageController.index));
app.use(route.get('/post', PageController.index));
app.use(route.get('/post/:id', PageController.post));

// routes, back-end
app.use(route.get('/login', function *() { yield this.render('login'); }));
// For passport
let bodyParser = require('koa-bodyparser');
app.use(bodyParser({
  formLimit: '10mb',
  jsonLimit: '10mb'
}));
let session = require('koa-session');
app.keys = [config.site.secret];
app.use(session(app));
require('./auth');// setting
let passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());
// login & logout
app.use(route.post('/login', AuthController.login));
app.use(route.get('/logout', AuthController.logout));
// Require authentication for now
app.use(authenticate());
app.use(route.get('/swiftwind', PageController.swiftwindIndex));
app.use(route.get('/swiftwind/post', PageController.swiftwindIndex));
app.use(route.get('/swiftwind/post/:id', PageController.swiftwindPost));
app.use(route.get('/swiftwind/post-editor/:id', PageController.swiftwindPostEditor));
// API, used for ajax request
app.use(route.get('/api/post', PostController.list));
app.use(route.get('/api/post/:id', PostController.read));
app.use(route.post('/api/post', PostController.create));
app.use(route.put('/api/post/:id', PostController.update));
app.use(route.delete('/api/post/:id', PostController.delete));

// listen & start
app.listen(port);
// console.log('***--|START|--***');
// console.log('Server time: ' + (new Date).toLocaleString());
// console.log('Listening on port: ' + port);

module.exports = app;
