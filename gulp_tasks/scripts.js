var gulp = require('gulp'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  ngAnnotate = require('gulp-ng-annotate'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  del = require('del');

var paths = {
  scripts: [
    './client/dev/src/app/app.module.js',
    './client/dev/src/**/*.js',
    './client/dev/src/**/**/*.js'
  ],
  build: {
    root: './client/dev/dist',
    scripts: './client/dev/dist/*.js'
  },
  templates: {
    root: './client/dev/temp',
    partials: './client/dev/temp/*.js'
  }
};

gulp.task('scripts-clean', function () {
  return del(paths.build.scripts);
});

gulp.task('scripts-hint', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts-build', ['scripts-clean', 'scripts-hint', 'templates'], function () {
  var allScripts = paths.scripts.slice(0);
  allScripts.push(paths.templates.partials);

  return gulp.src(allScripts)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.build.root))
    .pipe(uglify({
      mangle: true
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(paths.build.root));
});

gulp.task('scripts', ['scripts-build'], function () {
    del([paths.templates.root]);
});
