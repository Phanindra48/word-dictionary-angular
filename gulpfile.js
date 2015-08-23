var gulp = require('gulp');
//var gutil = require('gulp-util');
//var gulpif = require('gulp-if');
//var streamify = require('gulp-streamify');
var autoprefixer = require('gulp-autoprefixer');
//var less = require('gulp-less');
var concat = require('gulp-concat');
//var plumber = require('gulp-plumber');
//var source = require('vinyl-source-stream');
//var babelify = require('babelify');
//var browserify = require('browserify');
//var watchify = require('watchify');
//var uglify = require('gulp-uglify');

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/toastr/toastr.js'
  ]).pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', function() {
  return gulp.src(['public/stylesheets/main.css',
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/**/*.*', ['styles']);
});

gulp.task('default', ['styles', 'vendor','watch']);