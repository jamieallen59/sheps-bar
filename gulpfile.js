var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');
var surge = require('gulp-surge')

gulp.task('html', function() {
  return gulp.src('src/templates/*')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('sass', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src('./src/js/*')
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('json', function() {
  gulp.src('./src/js/data-sets/*')
    .pipe(gulp.dest('./build/js/data-sets/'));
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts/'))
})

gulp.task('images', function() {
   return gulp.src('./src/images/*')
    .pipe(gulp.dest('./build/images/'));
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
})

gulp.task('clean', function() {
  return del.sync('build');
})


gulp.task('watch', ['browserSync'], function(){
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/templates/*.html', ['html']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/js/data-sets/*.json', ['json']);
})


gulp.task('default', function (callback) {
  runSequence('clean', ['html', 'sass', 'js', 'json', 'fonts', 'images'], 'watch',
    callback
  )
})

gulp.task('deploy', [], function () {
  return surge({
    project: './build', // Path to your static build directory
    domain: 'sheps-bar-test.surge.sh' // Your domain or Surge subdomain
  })
})
