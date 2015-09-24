/* eslint func-style: [2, "declaration"]*/
var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('babel', compileBabel);
gulp.task('scss', compileScss);
gulp.task('default', compileAll);
gulp.task('watch', watch);

function compileBabel() {
  'use strict';
  console.log('Transpiling JS');
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({stage: 0}))
    // .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
}

function compileScss() {
  'use strict';
  console.log('Transpiling CSS');
  return gulp.src('css/index.scss')
    .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'));
}

function compileAll() {
  'use strict';
  compileBabel();
  compileScss();
}

function watch() {
  'use strict';
  gulp.watch('js/**/*.js', ['babel']);
  gulp.watch('css/**/*.scss', ['scss']);
}