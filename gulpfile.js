var gulp = require('gulp')
var scss = require('gulp-sass')
var babelify = require('babelify')
var watchify = require('watchify')
var autoprefixer = require('gulp-autoprefixer')
var browserify = require('browserify')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')
var gulpif = require('gulp-if')
var assign = require('lodash').assign

var customOpts = {
  entries: 'js/index.jsx',
  extensions: ['.jsx']
}
var opts = assign({}, watchify.args, customOpts)

gulp.task('babel', babel)
gulp.task('watch', watch)
gulp.task('scss', compileScss)

function watch () {
  var b = watchify(browserify(opts))
  b.transform(babelify.configure({stage: 0}))
  b.on('update', bundle.bind(null, b))
  b.on('log', gutil.log)
  gulp.watch('css/**/*.scss', [compileScss])
  return bundle(b)
}

function babel () {
  var b = browserify(opts)
  b.transform(babelify.configure({stage: 0}))
  return bundle(b)
}

function bundle (b) {
  return b.bundle()
  .on('error', gutil.log)
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(gulpif(process.env.MODE === 'prod', uglify()))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'))
}

function compileScss () {
  console.log('Transpiling CSS')
  return gulp.src('css/index.scss')
    .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'))
}
