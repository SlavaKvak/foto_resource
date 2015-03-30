'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {
    // Watch our scripts
    gulp.watch([
        'public/app/**/*.*',
        'public/css/*.less'
    ], [
        'browserify',
        'less'
    ]);
});