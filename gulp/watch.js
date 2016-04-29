var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var config = require('../config.json');

gulp.task('watch', function(callback) {
		gulp.watch(config.gulp.es6.src, ['es6to5']);
});

gulp.task('es6to5', function() {
	return gulp
					.src(config.gulp.es6.src)
					.pipe(plumber())
        	.pipe(babel())
        	.pipe(gulp.dest(config.gulp.es6.dist));
});