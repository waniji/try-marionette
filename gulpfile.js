var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var config = {
  bowerDir: './bower_components'
}

gulp.task('clean', function(cb) {
  del(['./dist'], cb);
});

gulp.task('vendor:js', function() {
  return browserify({
    entries: ['./src/js/vendor.js'],
    transform: ['debowerify']
  })
    .bundle()
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
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('app:js', function() {
  return browserify({
    entries: ['./src/js/app.js']
  })
    .bundle()
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

gulp.task('default', ['vendor:js', 'vendor:css', 'vendor:icon', 'app:html', 'app:js', 'app:css']);
