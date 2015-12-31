//** NPM Dependencies **//
var gulp        = require('gulp'),
    del         = require('del'),
		sass        = require('gulp-sass'),
		autoprefix  = require('gulp-autoprefixer'),
		minifyCSS   = require('gulp-minify-css'),
		stylish     = require('jshint-stylish'),
		jshint      = require('gulp-jshint'),
		uglify      = require('gulp-uglify'),
		concat      = require('gulp-concat'),
    usemin      =  require('gulp-usemin'),
		imagemin    = require('gulp-imagemin'),
		include     = require('gulp-include'),
		browserSync = require('browser-sync'),
		reload      = browserSync.reload,
    runSequence = require('run-sequence'),
    exec        = require('child_process').exec,
    kss         = require('kss');

//** Path Variables **//
var rootPath    = 'target/';
var incSource   = 'assets/html/**/*.inc';
var htmlSource  = 'assets/html/**/*.html';
var sassSource  = 'assets/sass/**/*.scss';
var jsSource    = 'assets/js/**/*.js';
var imgSource   = 'assets/img/**/*';
var sassPath    = 'assets/sass/**/*';
var kssNode     = 'node ' + __dirname + '/node_modules/kss/bin/kss-node ';
var flags = {
  styleguide: false
}

//** Dev Task **//
//Process HTML includes
gulp.task('htmlIncludes', function() {
  return gulp.src(htmlSource)
    .pipe(include())
    .pipe(gulp.dest(rootPath))
    .pipe(reload({stream:true}));
});

//Process CSS
gulp.task('sass', function() {
  return gulp.src(sassSource)
    .pipe(sass({ outputStyle: 'expanded', errLogToConsole: true }))
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(rootPath + 'css'))
    .pipe(reload({stream:true}));
});

//running this task sets a flag to true and allows
//the options generation of the styleguide
//this task should be run before the dev task
//example: gulp styleguide dev
gulp.task('styleguide', function() {
  flags.styleguide = true;
});

//if the styleguide flag is true, generate styleguide
gulp.task('styleguide:generate', function(cb) {
  if(flags.styleguide === true) {
    var cmd = exec(kssNode + 'assets/sass target/styleguide --css ../css/style.css', function(err, stdout, stderr) {
        reload();
      }
    );

    return cmd.on('close', cb);
  }
});

//Lint JS
gulp.task('js', function() {
  return gulp.src(jsSource)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(gulp.dest(rootPath + 'js'))
    .pipe(reload({stream:true}));
});

//Copy jQuery from node_modules to dev
gulp.task('copyJquery', function() {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(rootPath + '/js'));
});

//Process images
gulp.task('img', function() {
  return gulp.src(imgSource)
    .pipe(imagemin())
    .pipe(gulp.dest(rootPath + 'img'))
    .pipe(reload({stream:true}));
});

//Fire up a server
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: rootPath
        }
    });
});

//Task That Runs the Processes Listed Above
gulp.task('devBuild', ['htmlIncludes', 'sass', 'styleguide:generate', 'js', 'copyJquery', 'img']);

//Run the devBuild task and then fire up a local server
gulp.task('dev', ['devBuild', 'server'], function() {
  gulp.watch(htmlSource, ['htmlIncludes']);
  gulp.watch(incSource, ['htmlIncludes']);
  gulp.watch(sassSource, ['sass']);
  gulp.watch(jsSource, ['js']);
  gulp.watch(imgSource, ['img']);
  gulp.watch(sassPath, ['styleguide:generate'])
});

//** Build Task **//
//Clear out the target folder before doing a build
//Keep the images, since they have already been optimized.
//Keep the html files since the usemin task makes sure the paths are correct.
gulp.task('clean:target', function(cb) {
  del([
    'target/*', '!target/img', '!target/*.html'
  ], cb);
});

//Combine JS wrapped in usemin block
gulp.task('useMin', function() {
  return gulp.src(rootPath + '*.html')
    .pipe(usemin({
      js: [uglify()],
      css: [minifyCSS(), 'concat']
    }))
    .pipe(gulp.dest(rootPath));
});

//Clear out JS files that are combined by the useMin process
//When the usemin task runs, we need to remove the leftover files that remain.
gulp.task('cleanupUseMin', function(cb) {
  del([
    'target/js/**/*.js', '!target/js/scripts.js'
  ], cb);
});

//Make sure the clean task and dev tasks fire in the correct order
gulp.task('prod', function(){
    runSequence('clean:target', 'devBuild', 'useMin', 'cleanupUseMin');
});
