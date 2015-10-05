var gulp = require('gulp')
var scss = require('gulp-sass')
var babelify = require('babelify')
var autoprefixer = require('gulp-autoprefixer')
var browserify = require('browserify')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')

gulp.task('babel', compileBabel)
gulp.task('scss', compileScss)
gulp.task('default', ['babel', 'scss'])
gulp.task('watch', watch)

function compileBabel () {
  console.log('Transpiling JS')
  var b = browserify({
    entries: 'js/index.js',
    debug: true
  }).transform(babelify.configure({stage: 0}))
  return b.bundle()
  .on('error', gutil.log)
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/'))
}

function compileScss () {
  console.log('Transpiling CSS')
  return gulp.src('css/index.scss')
    .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'))
}

function watch () {
  gulp.watch('js/**/*.js', ['babel'])
  gulp.watch('css/**/*.scss', ['scss'])
}