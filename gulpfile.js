var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var config = {
  bowerDir: './bower_components',
  app: {
    js: ['src/**/*.js'],
    sass: ['src/**/*.sass', 'src/**/*.scss', '!src/**/vendor.*']
  },
  vendor: {
    js: mainBowerFiles({filter: "**/*.js"}),
  }
}

gulp.task('clean', function(cb) {
  del(['./dist'], cb);
});

gulp.task('vendor:js', function() {
  gulp.src(config.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('vendor:css', function() {
  sass('./src/sass/vendor.scss', {
    loadPath: [
      config.bowerDir + '/fontawesome/scss',
      config.bowerDir + '/bootstrap-sass/assets/stylesheets'
    ]
  })
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('vendor:icon', function() {
  gulp.src([
    config.bowerDir + '/fontawesome/fonts/**/*',
    config.bowerDir + '/bootstrap-sass/assets/fonts/**/*'
  ])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('app:html', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('app:js', function() {
var debowerify = require('debowerify');
  browserify({ entries: ['./src/js/app.js'], bundleExternal: false, external: ['jquery'], transform: [debowerify] })
    .external(config.vendor.js)
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
