'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var source = require('vinyl-source-stream');
var rename = require("gulp-rename");

gulp.task('less', function () {
  return gulp.src('./public/css/*.less')
    .pipe(less())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./public/dist/css'));
});