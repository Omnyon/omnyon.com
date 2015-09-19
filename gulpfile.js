var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('babel', function() {
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({stage: 0}))
    // .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', function() {
  return gulp.src('css/index.scss')
    .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['babel']);
  gulp.watch('css/**/*.scss', ['scss']);
});