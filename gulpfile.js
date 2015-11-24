'use strict';
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let eslint = require('gulp-eslint');

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    env: {PORT: 3000}
  }).on('restart');
});

gulp.task('lint', function () {
  return gulp.src([
    './controllers/*.js',
    './middlewares/*.js',
    './models/*.js',
    './test/*.js',
    './tools/*.js',
    './*.js'
  ]).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failOnError());
  // eslint() attaches the lint output to the eslint property
  // of the file object so it can be used by other modules.
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failOnError last.
});

gulp.task('default', ['lint', 'nodemon']);
