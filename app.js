'use strict';
process.chdir(__dirname);

//koa base
let koa = require('koa');
let app = koa();

//import middlewares
let favicon = require('koa-favicon');
let logger = require('koa-logger');
let serve = require('koa-static');
let route = require('koa-route');
let render = require('koa-ejs');
let etag = require('koa-etag');
let fresh = require('koa-fresh');
let gzip = require('koa-gzip');
let path = require('path');

//Controllers
let PageController = require('./controllers/PageController');
let PostController = require('./controllers/PostController');

//configs
let config = require('./config');
app.name = config.app.name || 'imagine';
app.env = process.env.NODE_ENV || 'development';
const port =  config.app.port || process.env.PORT || 3000;
const db_url = config.db[app.env];

//database
let mongoose  = require('mongoose');
mongoose.connect(db_url);

//render
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: ("development" === app.env) ? false : true,
  debug: ("development" === app.env) ? true : false
});

//use middlewares
app.use(gzip()); //compress the content
app.use(fresh()); //check whether to refresh the content based on the etag
app.use(etag()); //generate a etag 
app.use(favicon(path.join(__dirname, 'public/favicon.ico'))); //middleware for serving a favicon
if ('development' === app.env) {
  app.use(logger()); //Development style logging middleware
}
app.use(serve(path.join(__dirname, 'public'), {maxage: ("production" === app.env) ?  24 * 60 * 60 * 1000 : 0})); //Static file server middleware

//routes, front-end
app.use(route.get('/', PageController.index));
app.use(route.get('/post', PageController.index));
app.use(route.get('/post/:id', PageController.post));
//routes, back-end
app.use(route.post('/post', PostController.create));
app.use(route.put('/post/:id', PostController.update));
app.use(route.delete('/post/:id', PostController.delete));

//listen & start
app.listen(port);
console.log('***--|START|--***');
console.log('Server time: ' + (new Date).toLocaleString());
console.log('Listening on port: ' + port);

module.exports = app;