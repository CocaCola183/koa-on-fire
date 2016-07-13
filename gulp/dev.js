const gulp = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const nodemon = require('gulp-nodemon')
const config = require('../config.json')
const changed = require('gulp-changed')
const cache = require('gulp-cached')

// 编译
gulp.task('compile', function() {
  return gulp
          .src(config.gulp.es6.src)
          .pipe(cache('compile'))
          .pipe(changed(config.gulp.es6.dist))
          .pipe(plumber())
          .pipe(babel())
          .pipe(gulp.dest(config.gulp.es6.dist))
});

// 开发准备(编译，自动重启)
gulp.task('watch', function(callback) {
    gulp.watch(config.gulp.es6.src, ['compile', 'serve'])
});

// 开启自动重启服务
gulp.task('dev', ['compile'], function() {
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