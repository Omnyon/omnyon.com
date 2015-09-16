var gulp = require('gulp');
var babel = require('gulp-babel');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('babel', function() {
  return gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', function() {
  return gulp.src('css/index.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['babel']);
  gulp.watch('css/**/*.scss', ['scss']);
});