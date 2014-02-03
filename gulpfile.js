var gulp = require('gulp');
var gutil = require('gulp-util');
var stylish = require('jshint-stylish');

//plugins
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    minifyHtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    map = require('map-stream'),
    livereload = require('gulp-livereload'),
    include = require('gulp-include'),
    lr = require('tiny-lr'),
    server = lr();

// tasks
gulp.task('build', function(){
 
  // { concat, minify & jshint }
  var scriptFiles = './assets/js/**/*.js';
  var scriptDist = './js';
  
  gulp.src(scriptFiles)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest(scriptDist))
      .pipe(livereload(server));


  // { sass }
  var sassFiles = './assets/sass/style.scss';
  var sassDist = './css';

  gulp.src(sassFiles)
      .pipe(concat('style.min.scss'))
      .pipe(sass({outputStyle: 'nested'}))
      .pipe(gulp.dest('./css'))
      .pipe(livereload(server));


  // { image optimizer }
  var imageFiles = './assets/img/**/*';
  var imageDist = './img';
  gulp.src(imageFiles)
        .pipe(imagemin({ cache: true }))
        .pipe(gulp.dest(imageDist))
        .pipe(livereload(server));

  // { html }
  var includes = './assets/html/**/*.html';
  var includesDist = './';

  gulp.src(includes)
    .pipe(include())
    .pipe(gulp.dest(includesDist))
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
