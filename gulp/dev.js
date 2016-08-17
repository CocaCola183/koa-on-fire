const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const config = require('../config.json');
require('./compile.js');

// run dev
gulp.task('dev', ['compile'], function () {
  let stream = nodemon({
    script: './dist',
    watch: './src',
    ignore: ['./dist'],
    env: { 'NODE_ENV': config.env },
    tasks: ['compile'] // compile synchronously onChange
  });
  return stream;
});