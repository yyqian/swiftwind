'use strict';
process.chdir(__dirname);

//koa base
var koa = require('koa');
var app = koa();

//import middlewares
var favicon = require('koa-favicon');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');

//Controllers
var PageController = require('./controllers/PageController');
var PostController = require('./controllers/PostController');

//configs
var config = require('./config');
app.name = config.app.name || 'imagine';
app.env = process.env.NODE_ENV || 'development';
const port =  config.app.port || process.env.PORT || 3000;
const db_url = config.db[app.env];

//database
var mongoose  = require('mongoose');
mongoose.connect(db_url);

//use middlewares
app.use(favicon(__dirname + '/public/favicon.ico')); //middleware for serving a favicon
if (app.env !== 'test') {
  app.use(logger()); //Development style logging middleware
}
app.use(serve(__dirname + '/public')); //Static file server middleware

//routes
app.use(route.get('/', PageController.index));
app.use(route.get('/post', PostController.list));
app.use(route.get('/post/:id', PostController.read));
app.use(route.post('/post', PostController.create));
app.use(route.put('/post/:id', PostController.update));
app.use(route.delete('/post/:id', PostController.delete));

//listen & start
app.listen(port);
console.log('***--START--***');
console.log('Server time: ' + (new Date).toLocaleString());
console.log('Listening on port: ' + port);

module.exports = app;