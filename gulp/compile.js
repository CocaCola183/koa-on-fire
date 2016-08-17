const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const config = require('../config.json');
const changed = require('gulp-changed');
const cache = require('gulp-cached');

// compile es5+ to es5
gulp.task('compile', function() {
  let stream = gulp
          .src(config.gulp.es6.src)
          .pipe(cache('compile'))
          .pipe(changed(config.gulp.es6.dist))
          .pipe(plumber())
          .pipe(babel())
          .pipe(gulp.dest(config.gulp.es6.dist));
  return stream;
});