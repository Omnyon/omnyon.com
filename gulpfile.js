/* eslint func-style: [2, "declaration"]*/

var gulp = require('gulp');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');

gulp.task('babel', compileBabel);
gulp.task('scss', compileScss);
gulp.task('default', ['babel', 'scss']);
gulp.task('watch', watch);

function compileBabel() {
  console.log('Transpiling JS');
  browserify('js/index.js', {debug: true})
    .transform(babelify.configure({stage: 0}))
    // .pipe(sourcemaps.init())
    .bundle()
    .on('error', function(err) { console.log('Error : ' + err.message); })
    // .pipe(sourcemaps.write('.'))
    .pipe(fs.createWriteStream('dist/bundle.js'));
}

function compileScss() {
  console.log('Transpiling CSS');
  return gulp.src('css/index.scss')
    .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'));
}

function watch() {
  gulp.watch('js/**/*.js', ['babel']);
  gulp.watch('css/**/*.scss', ['scss']);
}