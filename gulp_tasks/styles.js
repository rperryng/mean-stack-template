var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  del = require('del'),
  path = require('path');

var paths = {
  build: {
    root: './client/dev/dist',
    styles: './client/dev/dist/*.css'
  },
  source: './client/dev/src/styles/*.less'
};

gulp.task('styles-clean', function () {
  return del([paths.build.styles]);
});

gulp.task('styles-build', ['styles-clean'], function () {
  return gulp.src(paths.source)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(concat('theme.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(paths.build.root));
});

gulp.task('styles', ['styles-build']);
