'use strict';


var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('lint', function() {
    gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

//Watch taskgulp
gulp.task('default',['styles'],function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('src/**/*.js',['lint']);
});