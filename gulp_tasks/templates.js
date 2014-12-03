var gulp = require('gulp'),
  angularTemplates = require('gulp-angular-templatecache'),
  htmlhint = require('gulp-htmlhint'),
  rename = require('gulp-rename'),
  del = require('del');

var paths = {
  temp: {
    root: './client/dev/temp',
    templates: './client/dev/temp/*.templates.js'
  },
  templates: './client/dev/src/app/**/*.partial.html'
};

gulp.task('templates-clean', function () {
  return del(paths.temp.templates);
});

gulp.task('templates', ['templates-clean'], function () {
  return gulp.src(paths.templates)
    .pipe(htmlhint({
      "doctype-first": false
    }))
    .pipe(htmlhint.reporter())
    .pipe(angularTemplates('templates.js', {
      module: 'MyApp',
      moduleSystem: false
    }))
    .pipe(rename('secretSanta.templates.js'))
    .pipe(gulp.dest(paths.temp.root));
});
