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
    runSequence = require('run-sequence');

//** Path Variables **//
var rootPath    = 'target/'
var incSource   = 'assets/html/**/*.inc';
var htmlSource  = 'assets/html/**/*.html';
var sassSource  = 'assets/sass/**/*.scss';
var jsSource    = 'assets/js/**/*.js';
var imgSource   = 'assets/img/**/*';

//** Dev Task **//

//Process HTML Includes
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

//Lint JavaScript
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

//Process Images
gulp.task('img', function() {
  return gulp.src(imgSource)
    .pipe(imagemin())
    .pipe(gulp.dest(rootPath + 'img'))
    .pipe(reload({stream:true}));
});

//Fire Up a Server
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: rootPath
        }
    });
});

//Task That Runs the Processes Listed Above - Use this task for deployment to dev env
gulp.task('devBuild', ['htmlIncludes', 'sass', 'js', 'copyJquery', 'img']);

//Run the devBuild task and then fire up a local server
//Use the --notify flag to show messages on task completion
gulp.task('devServe', ['devBuild', 'server'], function() {
  gulp.watch(htmlSource, ['htmlIncludes']);
  gulp.watch(incSource, ['htmlIncludes']);
  gulp.watch(sassSource, ['sass']);
  gulp.watch(jsSource, ['js']);
  gulp.watch(imgSource, ['img']);
});

//** Build Task **//
//Clear out the target folder before doing a build
gulp.task('clean:target', function(cb) {
  del([
    'target/*'
  ], cb);
});

//Copy HTML
gulp.task('copyHtml', function() {
  return gulp.src(rootPath + '*.html')
    .pipe(gulp.dest(rootPath));
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

//Clear out files that are combined by the useMin process
gulp.task('cleanupUseMin', function(cb) {
  del([
    'target/js/**/*.js', '!target/js/scripts.js'
  ], cb);
});

//Copy Images to Dist
gulp.task('copyImages', function() {
 return gulp.src(rootPath + 'img/*')
  .pipe(gulp.dest(rootPath + 'img'));
});

//Copy files from dev, combine scripts, combine css
gulp.task('preProd', ['copyHtml', 'useMin', 'copyImages']);

//Make sure the clean task, devBuild, and preProd tasks fire in the correct order
gulp.task('prodBuild', function(){
    runSequence('clean:target', 'devBuild', 'preProd', 'cleanupUseMin');
});