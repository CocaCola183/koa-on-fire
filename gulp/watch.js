var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var config = require('../config.json');
const changed = require('gulp-changed');

gulp.task('watch', function(callback) {
		gulp.watch(config.gulp.es6.src, ['es6to5']);
});

gulp.task('es6to5', function() {
	return gulp
					.src(config.gulp.es6.src)
					.pipe(changed(config.gulp.es6.dist))
					.pipe(plumber())
        	.pipe(babel())
        	.pipe(gulp.dest(config.gulp.es6.dist));
});