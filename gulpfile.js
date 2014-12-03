var gulp = require('gulp'),
  requireDir = require('require-dir');

// load other gulp tasks
requireDir('./gulp_tasks');

var paths = {
  scriptsAndTemplates: [
    './client/dev/src/app/**/*.js',
    './client/dev/src/app/*.js',
    './client/dev/src/app/**/*.partial.html'
  ],
  styles: [
    './client/dev/src/styles/*.less'
  ],
};

gulp.task('watch', ['scripts', 'styles'], function () {
  gulp.watch(paths.scriptsAndTemplates, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['watch']);
