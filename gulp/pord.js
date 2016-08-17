const gulp = require('gulp');
const config = require('../config.json');
const nodemon = require('gulp-nodemon');

// run in prod
gulp.task('prod', function () {
  let stream = nodemon({
    script: './dist',
    env: { 'NODE_ENV': config.env }
  });
  return stream;
});