'use strict';


var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets/'));
});

//Watch taskgulp
gulp.task('default',['styles'],function() {
    gulp.watch('sass/**/*.scss',['styles']);
});