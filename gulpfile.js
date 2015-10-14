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
    minifyHtml  = require('gulp-minify-html'),
		notify      = require('gulp-notify'),
		browserSync = require('browser-sync'),
		reload      = browserSync.reload,
    runSequence = require('run-sequence'),
    argv        = require('yargs').argv,
    gulpif      = require('gulp-if');

//** Path Variables **//
var rootPath    = 'dev/';
var distPath    = 'dist/';
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
    .pipe(reload({stream:true}))
    .pipe(gulpif(argv.notify, notify({onLast: true, message: "HTML includes compiled!"})));
});

//Process CSS
gulp.task('sass', function() {
  return gulp.src(sassSource)
    .pipe(sass({ outputStyle: 'expanded', errLogToConsole: true }))
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(rootPath + 'css'))
    .pipe(reload({stream:true}))
    .pipe(gulpif(argv.notify, notify({onLast: true, message: 'SCSS compiled!'})));
});

//Lint JavaScript
gulp.task('js', function() {
  return gulp.src(jsSource)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(gulp.dest(rootPath + 'js'))
    .pipe(reload({stream:true}))
    .pipe(gulpif(argv.notify, notify({onLast: true, message: 'JS linted!'})));
});

//Copy jQuery from assets/bower_components to dev
gulp.task('copyJquery', function() {
  return gulp.src('assets/bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(rootPath + '/js'));
});

//Process Images
gulp.task('img', function() {
  return gulp.src(imgSource)
    .pipe(imagemin())
    .pipe(gulp.dest(rootPath + 'img'))
    .pipe(reload({stream:true}))
    .pipe(gulpif(argv.notify, notify({onLast: true, message: 'Images crunched!'})));
});

//Fire Up a Dev Server
gulp.task('server:dev', function() {
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
gulp.task('devServe', ['devBuild', 'server:dev'], function() {
  gulp.watch(htmlSource, ['htmlIncludes']);
  gulp.watch(incSource, ['htmlIncludes']);
  gulp.watch(sassSource, ['sass']);
  gulp.watch(jsSource, ['js']);
  gulp.watch(imgSource, ['img']);
});

//** Build Task **//
//Clear out the dist folder before doing a build
gulp.task('clean:dist', function(cb) {
  del([
    'dist/*'
  ], cb);
});

//Minify HTML
gulp.task('copyHtml', function() {
  return gulp.src(rootPath + '*.html')
    .pipe(gulp.dest(distPath));
});

//Combine JS wrapped in usemin block
gulp.task('useMin', function() {
  return gulp.src(rootPath + '*.html')
    .pipe(usemin({
      js: [uglify()],
      css: [minifyCSS(), 'concat']
    }))
    .pipe(gulp.dest(distPath));
});

//Copy Images to Dist
gulp.task('copyImages', function() {
 return gulp.src(rootPath + 'img/*')
  .pipe(gulp.dest(distPath + 'img'));
});

//Fire Up a Prod Server
gulp.task('server:prod', function() {
    browserSync({
        server: {
            baseDir: distPath
        }
    });
});

//Copy files from dev, combine scripts, combine css
gulp.task('preProd', ['copyHtml', 'useMin', 'copyImages']);

//Make sure the clean task, devBuild, and preProd tasks fire in the correct order
gulp.task('prod', function(){
    runSequence('clean:dist', 'devBuild', 'preProd');
});

//Run the prod tasks and then fire up a local server
gulp.task('prodServe', function(){
    runSequence('clean:dist', 'preProd', 'server:prod');
});
