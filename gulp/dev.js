var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');
var config = require('../config.json');

gulp.task('compile', function() {
	return gulp
					.src(config.gulp.es6.src)
					.pipe(plumber())
        	.pipe(babel())
        	.pipe(gulp.dest(config.gulp.es6.dist));
});

gulp.task('watch', function(callback) {
		gulp.watch(config.gulp.es6.src, ['compile']);
});

gulp.task('dev', function() {
	return nodemon({
    script: config.gulp.main,
    ext: 'js',
    env: { 'NODE_ENV': 'development'},
    ignore: [
    	'.git',
    	'node_modules/**/node_modules',
    	'helper',
    	'public'
  	],
  	watch: [
  		'./src'
  	],
  	tasks: ['compile']
  });
});