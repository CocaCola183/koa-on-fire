var gulp = require('gulp');
var config = require('./config.json');
var require_dir = require('require-dir');
var tasks = require_dir('./build');

gulp.task('default', function(callback) {
	console.log('Gulp task done');
	callback();
});