'use strict';
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    env: {PORT: 3000}
  }).on('restart');
});

gulp.task('default', ['nodemon']);