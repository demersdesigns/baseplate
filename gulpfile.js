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
var cssSrc = 'assets/sass/**/*.scss',
		cssDist = 'dist/css',
		incSrc = 'assets/inc/**/*.inc',
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
	gulp.watch(incSrc, ['html']);
	gulp.watch(htmlSrc, ['html']);
	gulp.watch(imageSrc, ['images']);
	gulp.watch(jsSrc, ['scripts']);

	var server = livereload();

	gulp.watch(['dist/**']).on('change', function(file){
		server.changed(file.path);
	});
});