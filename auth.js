'use strict';
let passport = require('koa-passport');
let config = require('./config');

passport.serializeUser(function(user, done) {
  done(null, user.name)
});

passport.deserializeUser(function(username, done) {
  done(null, {name: username})
});

let LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === config.site.username && password === config.site.password) {
      return done(null, {name: username});
    } else {
      return done(null, false, {message: 'Incorrect username or password'});
    }
  }
));