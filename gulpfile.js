var gulp = require('gulp');
var notify = require("gulp-notify");
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  this.emit('end');
};

var config = {
  bowerDir: './bower_components'
}

gulp.task('vendor:js', function() {
  return browserify({
    entries: ['./src/js/vendor.js'],
    transform: ['debowerify']
  })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('vendor:css', function() {
  return sass('./src/sass/vendor.scss', {
    loadPath: [
      config.bowerDir + '/fontawesome/scss',
      config.bowerDir + '/bootstrap-sass/assets/stylesheets'
    ]
  })
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('vendor:icon', function() {
  return gulp.src([
    config.bowerDir + '/fontawesome/fonts/**/*',
    config.bowerDir + '/bootstrap-sass/assets/fonts/**/*'
  ])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('app:html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('app:js', function() {
  return browserify({
    entries: ['./src/js/app.js'],
    transform: ['hbsfy']
  })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('app:css', function() {
  return sass('./src/sass/app.scss', {
    loadPath: [
      './src/sass/app/'
    ]
  })
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function(){
  gulp.watch(['./src/*.html'], ['app:html']);
  gulp.watch(['src/**/*.js', 'src/template/*.hbs'], ['app:js']);
  gulp.watch(['src/**/*.css', 'src/**/*.scss'], ['app:css']);
  gulp.watch(['src/js/vendor.js'], ['vendor:js']);
});

gulp.task('default', ['vendor:js', 'vendor:css', 'vendor:icon', 'app:html', 'app:js', 'app:css']);
gulp.task('vendor', ['vendor:js', 'vendor:css', 'vendor:icon']);
gulp.task('app', ['app:html', 'app:js', 'app:css']);
