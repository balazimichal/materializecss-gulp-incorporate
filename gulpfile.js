var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var surge = require('gulp-surge');

// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// File paths
var PROD_PATH = 'prod/';
var IMAGES_PATH = 'dev/images/**/*.{png,jpeg,jpg,svg,gif}';

// HTML
gulp.task('html', function() {
  return gulp
    .src('dev/*.html')
    .pipe(gulp.dest(PROD_PATH))
    .pipe(livereload());
});

// Styles For SCSS
gulp.task('styles', function() {
  console.log('starting styles task');
  return gulp
    .src('dev/css/styles.scss')
    .pipe(autoprefixer())
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PROD_PATH + 'css'))
    .pipe(livereload());
});

// Materialize CSS
gulp.task('materializeCSS', function() {
  console.log('starting materialize styles task');
  return gulp
    .src('dev/css/materialize.min.css')
    .pipe(gulp.dest(PROD_PATH + 'css'));
});

// Scripts
gulp.task('scripts', function() {
  console.log('starting scripts task');

  return gulp
    .src('dev/js/scripts.js')
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PROD_PATH + 'js'))
    .pipe(livereload());
});

// Materialize JS
gulp.task('materializeJS', function() {
  console.log('starting materialize js task');
  return gulp
    .src('dev/js/materialize.min.js')
    .pipe(gulp.dest(PROD_PATH + 'js'));
});

// Images
gulp.task('images', function() {
  return gulp
    .src(IMAGES_PATH)
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress()
      ])
    )
    .pipe(gulp.dest(PROD_PATH + 'images'));
});

// Watch
gulp.task('watch', ['default'], function() {
  console.log('Starting watch task');
  require('./server.js');
  livereload.listen();
  gulp.watch('dev/js/**/*.js', ['scripts']);
  gulp.watch('dev/css/**/*.scss', ['styles']);
  gulp.watch('dev/*.html', ['html']);
});

// Build
gulp.task('surge', [], function() {
  return surge({
    project: './prod', // Path to dist directory
    domain: 'incorporate.surge.sh' // url to Surge demo
  });
});

// Default
gulp.task(
  'default',
  ['images', 'styles', 'materializeCSS', 'materializeJS', 'scripts', 'html'],
  function() {
    console.log('Starting default task');
  }
);
