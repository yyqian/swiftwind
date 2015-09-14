'use strict';
module.exports = function () {
  return function *(next) {
    if (this.isAuthenticated()) {
      yield next;
    } else {
      this.redirect('/');
    }
  };
};

