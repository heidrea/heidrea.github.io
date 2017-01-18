var concat   = require('gulp-concat');
var connect  = require('gulp-connect');
var del      = require('del');
var fs       = require('fs');
var gulp     = require('gulp');
var htmlmin  = require('gulp-htmlmin');
var mustache = require('mustache');
var pages    = require('gulp-gh-pages');
var rename   = require('gulp-rename');
var through  = require('through2');

var render = function(content) {
  var template = fs.readFileSync('src/layout.html', 'utf8');
  return new Buffer(mustache.render(template, {}, { content: content }));
};

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('cname', ['clean'], function() {
  return gulp.src('src/CNAME').pipe(gulp.dest('dist'));
});

gulp.task('assets', ['cname'], function() {
  return gulp.src('src/assets/**/*').pipe(gulp.dest('dist/assets'));
});

gulp.task('build', ['assets'], function() {
  return gulp.src('src/templates/**/*html')
    .pipe(through.obj(function(chunk, enc, callback) {
      chunk.contents = render(fs.readFileSync(chunk.path, 'utf8'));
      this.push(chunk);
      return callback(null, chunk); }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() { return connect.server({ root: 'dist', livereload: true }); });

gulp.task('reload',  ['build'], function() { return gulp.src('dist').pipe(connect.reload()); });
gulp.task('watch',              function() { return gulp.watch('src/**/*', ['build', 'reload']); });
gulp.task('default', ['build'], function() { gulp.start('watch'); gulp.start('connect'); });
gulp.task('deploy',  ['build'], function() { return gulp.src('dist/**/*').pipe(pages({ branch: 'master' })); });
