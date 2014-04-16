var gulp = require('gulp');
var gutil = require('gulp-util');
var stylish = require('jshint-stylish');

//plugins
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minifyHtml = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    map = require('map-stream'),
    livereload = require('gulp-livereload'),
    include = require('gulp-include'),
    wait = require('gulp-wait'),
    lr = require('tiny-lr'),
    server = lr();

// tasks
gulp.task('build', function(){
 
  // { concat, minify & jshint }
  var scriptFiles = './assets/js/**/*a.js';
  var scriptDist = './js';
  
  gulp.src(scriptFiles)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(concat('all.min.js'))
      .pipe(uglify({outSourceMap: true}))
      .pipe(gulp.dest(scriptDist))
      .pipe(wait(100))
      .pipe(livereload(server));

  // { image optimizer }
  var imageFiles = './assets/img/**/*';
  var imageDist = './img';
  gulp.src(imageFiles)
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(imageDist))
        .pipe(wait(100))
        .pipe(livereload(server));

  // { html }
  var includes = './assets/html/**/*.html';
  var includesDist = './';

  gulp.src(includes)
    .pipe(include())
    .pipe(gulp.dest(includesDist))
    .pipe(wait(100))
    .pipe(livereload(server));

  // { sass }
  var sassFiles = './assets/sass/style.scss';
  var sassDist = './css';

  gulp.src(sassFiles)
      .pipe(concat('style.scss'))
      .pipe(sass({outputStyle: 'nested', errLogToConsole: true}))
      .pipe(prefix("last 2 versions", "ie 8"))
      //.pipe(minifyCSS())
      .pipe(gulp.dest('./css'))
      .pipe(concat('style.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./css'))
      .pipe(wait(100))
      .pipe(livereload(server));
});

gulp.task('lr-server', function() {  
  server.listen(35729, function(err) {
    if(err) return console.log(err);
  })
});


// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('build', 'lr-server');

  // Watch files and run tasks if they change
  gulp.watch('./assets/**/*', function() {
    var date = new Date(), hour = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(),
        buildTime = hour + ':' + minutes + ':' + seconds;

    gulp.run('build', function() {
      gutil.log(gutil.colors.blue('------------- Built! -------------'), gutil.colors.green('( Last time -', buildTime, ')'));
    });

  });
});
