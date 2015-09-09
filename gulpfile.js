'use strict';
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    env: {PORT: 3000}
  }).on('restart');
});

gulp.task('default', ['nodemon']);