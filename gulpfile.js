/* eslint-disable node/no-unpublished-require */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS  = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
/* eslint-enable node/no-unpublished-require */

gulp.task('scss', () => {
  return gulp
    .src('dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', () => {
    return gulp
      .src('dev/js/**/*.js')
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('public/javascripts'))
  }
);

gulp.task('default',  () => {
  gulp.watch('dev/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('dev/js/**/*.js', gulp.series('scripts'));
});
