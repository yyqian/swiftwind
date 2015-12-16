'use strict';
let passport = require('koa-passport');

module.exports = {
  login: passport.authenticate('local', {
    successRedirect: '/swiftwind',
    failureRedirect: '/login'
  }),
  logout: function *() {
    this.logout();
    this.redirect('/');
  }
};
