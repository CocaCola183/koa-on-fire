const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const config = require('./config.json');
const changed = require('gulp-changed');
const cache = require('gulp-cached');
const filter = require('gulp-filter');

// compile es5+ to es5
gulp.task('compile', function() {
	const jsFilter = filter('**/*.js', {restore: true});
  let stream = gulp
          .src(config.gulp.es6.src)
          .pipe(jsFilter)
          .pipe(cache('compile'))
          .pipe(changed(config.gulp.es6.dist))
          .pipe(plumber())
          .pipe(babel())
          .pipe(jsFilter.restore)
          .pipe(gulp.dest(config.gulp.es6.dist));
  return stream;
});