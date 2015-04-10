//** NPM Dependencies **//
var gulp = require('gulp'),
    del = require('del'),
		sass = require('gulp-sass'),
		autoprefix = require('gulp-autoprefixer'),
		minifyCSS = require('gulp-minify-css'),
		stylish = require('jshint-stylish'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
    usemin =  require('gulp-usemin'),
		imagemin = require('gulp-imagemin'),
		include = require('gulp-include'),
    minifyHtml = require('gulp-minify-html'),
		cache = require('gulp-cache'),
		notify = require('gulp-notify'),
		browserSync = require('browser-sync'),
		reload      = browserSync.reload;

//** Path Variables **//
var rootPath = '.';
var incSource = 'html/**/*.inc';
var htmlSource = 'html/**/*.html';
var sassSource = 'sass/**/*.scss';
var jsSource = 'js/**/*.js';
var imgSource = 'img/**/*';

//** Dev Task **//

//Process HTML Includes
gulp.task('htmlIncludes', function() {
  return gulp.src(htmlSource)
    .pipe(include())
    .pipe(gulp.dest(rootPath))
    .pipe(reload({stream:true}))
    .pipe(notify({onLast: true, message: "HTML includes compiled!"}));
});

//Process CSS
gulp.task('sass', function() {
  return gulp.src(sassSource)
    .pipe(sass({ outputStyle: 'expanded', errLogToConsole: true }))
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(reload({stream:true}))
    .pipe(notify({onLast: true, message: 'SCSS compiled!'}));
});

//Lint JavaScript
gulp.task('js', function() {
  return gulp.src(jsSource)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(reload({stream:true}))
    .pipe(notify({onLast: true, message: "JS linted"}));
});

//Process Images
gulp.task('img', function() {
  return gulp.src(imgSource)
    .pipe(imagemin())
    .pipe(reload({stream:true}))
    .pipe(notify({onLast: true, message: "Images crunched!"}));
});

//Fire Up a Dev Server
gulp.task('server:dev', function() {
    browserSync({
        server: {
            baseDir: rootPath
        }
    });
});

//Task That Runs the Processes Listed Above
gulp.task('devBuild', ['htmlIncludes', 'sass', 'js', 'img']);

//Run the Dev Build Task and Then Fire up a Server
gulp.task('dev', ['devBuild', 'server:dev'], function() {
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
    'dist'
  ], cb);
});

//Minify HTML
gulp.task('htmlMinify', function() {
  return gulp.src('*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/'));
});

//Minify CSS
gulp.task('cssMinify', function() {
  return gulp.src('css/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

//Combine JS wrapped in usemin block
gulp.task('useMin', function() {
  return gulp.src('*.html')
    .pipe(usemin({
      js: [uglify()]
    }))
    .pipe(gulp.dest('dist/'));
});

//Copy Images to Dist
gulp.task('copyImages', function() {
 return gulp.src('img/*')
  .pipe(gulp.dest('dist/img'));
});

//Fire Up a Prod Server
gulp.task('server:prod', function() {
    browserSync({
        server: {
            baseDir: "dist/"
        }
    });
});

//Run the dev tasks, then run the prod tasks
gulp.task('prodBuild', ['devBuild', 'htmlMinify', 'cssMinify', 'useMin', 'copyImages']);

//Run the Prod Build Task and Then Fire up a Server
gulp.task('prod', ['clean:dist', 'prodBuild']); //'server:prod'