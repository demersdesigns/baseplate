// var gulp = require('gulp');/
// var gutil = require('gulp-util');/
// var stylish = require('jshint-stylish');/

//plugins
// var concat = require('gulp-concat'),/
//     uglify = require('gulp-uglify'),/
//     jshint = require('gulp-jshint'),/
//     sass = require('gulp-sass'),/
//     prefix = require('gulp-autoprefixer'),/
//     minifyHtml = require('gulp-minify-html'),
//     minifyCSS = require('gulp-minify-css'),/
//     imagemin = require('gulp-imagemin'),/
//     cache = require('gulp-cache'),/
//     map = require('map-stream'),
//     livereload = require('gulp-livereload'),/
//     include = require('gulp-include'),/
//     wait = require('gulp-wait'),/
//     lr = require('tiny-lr'),
//     server = lr();

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefix = require('gulp-autoprefixer'),
		minifyCSS = require('gulp-minify-css'),
		stylish = require('jshint-stylish'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		imagemin = require('gulp-imagemin'),
		include = require('gulp-include'),
		rename = require('gulp-rename'),
		cache = require('gulp-cache'),
		livereload = require('gulp-livereload'),
		wait = require('gulp-wait'),
		notify = require('gulp-notify');

//Vars for file locations and output destinations
var cssSrc = 'assets/sass/style.scss',
		cssDist = 'dist/css',
		htmlSrc = 'assets/html/**/*.html',
		htmlDist = 'dist',
		imageSrc = 'assets/img/**/*',
		imageDist = 'dist/img',
		jsSrc = 'assets/js/**/*',
		jsDist = 'dist/js';

//Compile sass, autoprefix, output non-minified version, output minified version,
//notify the OS
gulp.task('styles', function(){
	return gulp.src(cssSrc)
		.pipe(sass({outputStyle: 'expanded', errLogToConsole: true}))
		.pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(cssDist))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(cssDist))
		.pipe(notify({onLast: true, message: 'CSS compiled and minified!'}))
});

//Compile HTML Includes
gulp.task('html', function(){
	return gulp.src(htmlSrc)
		.pipe(include())
    .pipe(gulp.dest(htmlDist))
    .pipe(notify({onLast: true, message: "HTML includes compiled!"}))
});

//Optimize images
gulp.task('images', function(){
	return gulp.src(imageSrc)
		.pipe(cache(imagemin()))
    .pipe(gulp.dest(imageDist))
    .pipe(notify({onLast: true, message: "Images crunched!"}))
});

gulp.task('scripts', function(){
	return gulp.src(jsSrc)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(jsDist))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(jsDist))
		.pipe(notify({onLast: true, message: "JS linted, concatenated, and minfied!"}))
});

//Run the tasks listed above
gulp.task('default', function(){
	gulp.start('styles', 'html', 'images', 'scripts');
});

//Watch for changes and reload the page
gulp.task('watch', function(){
	gulp.watch(cssSrc, ['styles']);
	gulp.watch(htmlSrc, ['html']);
	gulp.watch(imageSrc, ['images']);
	gulp.watch(jsSrc, ['scripts']);

	var server = livereload();

	gulp.watch(['dist/**']).on('change', function(file){
		server.changed(file.path);
	});
});

// tasks
// gulp.task('build', function(){
 
//   // { concat, minify & jshint }
//   var scriptFiles = './assets/js/**/*a.js';
//   var scriptDist = './js';
  
//   gulp.src(scriptFiles)
//       .pipe(jshint())
//       .pipe(jshint.reporter(stylish))
//       .pipe(concat('all.min.js'))
//       .pipe(uglify({outSourceMap: true}))
//       .pipe(gulp.dest(scriptDist))
//       .pipe(notify({onLast: true, message: "JS compiled!"}))
//       .pipe(wait(100))
//       .pipe(livereload(server));

//   // { image optimizer }
//   var imageFiles = './assets/img/**/*';
//   var imageDist = './img';
//   gulp.src(imageFiles)
//         .pipe(cache(imagemin()))
//         .pipe(gulp.dest(imageDist))
//         .pipe(notify({onLast: true, message: "Images crunched!"}))
//         .pipe(wait(100))
//         .pipe(livereload(server));

//   // { html }
//   var includes = './assets/html/**/*.html';
//   var includesDist = './';

//   gulp.src(includes)
//     .pipe(include())
//     .pipe(gulp.dest(includesDist))
//     .pipe(notify({onLast: true, message: "HTML includes compiled!"}))
//     .pipe(wait(100))
//     .pipe(livereload(server));

//   // { sass }
//   var sassFiles = './assets/sass/style.scss';
//   var sassDist = './css';

//   gulp.src(sassFiles)
//       .pipe(concat('style.scss'))
//       .pipe(sass({outputStyle: 'nested', errLogToConsole: true}))
//       .pipe(prefix("last 2 versions", "ie 8"))
//       //.pipe(minifyCSS())
//       .pipe(gulp.dest('./css'))
//       .pipe(concat('style.min.css'))
//       .pipe(minifyCSS())
//       .pipe(gulp.dest('./css'))
//       .pipe(notify({onLast: true, message: "Sass compiled!"}))
//       .pipe(wait(100))
//       .pipe(livereload(server));
// });

// gulp.task('lr-server', function() {  
//   server.listen(35729, function(err) {
//     if(err) return console.log(err);
//   })
// });


// // The default task (called when you run `gulp`)
// gulp.task('default', function() {
//   gulp.start('build', 'lr-server');

//   // Watch files and run tasks if they change
//   gulp.watch('./assets/**/*', function() {
//     var date = new Date(), hour = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(),
//         buildTime = hour + ':' + minutes + ':' + seconds;

//     gulp.start('build', function() {
//       gutil.log(gutil.colors.blue('------------- Built! -------------'), gutil.colors.green('( Last time -', buildTime, ')'));
//     });

//   });
// });
