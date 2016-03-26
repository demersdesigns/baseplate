//** NPM Dependencies **//
var gulp        = require('gulp'),
    del         = require('del'),
    include     = require('gulp-file-include'),
    sass        = require('gulp-sass'),
    autoprefix  = require('gulp-autoprefixer'),
    minifyCSS   = require('gulp-minify-css'),
    stylish     = require('jshint-stylish'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps'),
    usemin      =  require('gulp-usemin'),
    imagemin    = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;
   //yargs       = require('yargs').argv;

//** Path Variables **//
var rootPath    = 'app/',
    tmpPath = '.tmp/',
    distPath = 'public/',
    htmlSource = 'app/html/*.html',
    htmlIncludesSource = 'app/html/**/*.html',
    stylesSource = 'app/styles/**/*.scss',
    scriptsSource = 'app/scripts/**/*.js',
    imagesSource = 'app/images/**/*',
    tmpImagesSource = '.tmp/images/**/*',
    fontsSource = 'app/fonts/**/*';
//TODO: Document that this needs to be added if integrating styleplate
//if(yargs.styleguide) {
//    var styleguideSrc = '../styleplate/styles/**/*.scss';
//}

//** Dev Task **//
//Compile HTML includes and copy to tmp folder
gulp.task('html', function() {
    return gulp.src(htmlSource)
        .pipe(plumber())
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(tmpPath))
        .pipe(reload({ stream: true }));
});

//Compile and add sourcemap to styles
gulp.task('styles', function () {
    return gulp.src(stylesSource)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compact', errLogToConsole: true }))
        .pipe(autoprefix())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(tmpPath + '/styles'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

//Copy jQuery from node_modules to dev
gulp.task('copyJquery', function() {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(tmpPath + '/scripts/vendor'));
});

//Lint scripts
gulp.task('jshint', function () {
    return gulp.src([scriptsSource, '!app/scripts/vendor/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(gulp.dest(tmpPath + 'scripts'))
        .pipe(browserSync.stream({ match: '**/*.js' }));
});

//Copy images
gulp.task('copyImages', function() {
    return gulp.src(imagesSource)
        .pipe(gulp.dest(tmpPath + 'images'));
});

//Optimize Images
//this is a separate task because we don't want to optimize
//our svg files automatically
gulp.task('optimizeImages', function() {
    return gulp.src(tmpImagesSource + '*.{gif,jpg,png}')
        .pipe(imagemin())
        .pipe(gulp.dest(tmpPath + 'images'))
        .pipe(reload({ stream: true }));
});

//Copy images to tmp folder then, optimize
gulp.task('images', function(cb) {
    runSequence('copyImages', 'optimizeImages', cb);
});

//Fire up a dev server
gulp.task('dev:serve', function() {
    browserSync({
        server: {
            baseDir: [rootPath, tmpPath]
        }
    });
});

//Runs the dev tasks listed above
gulp.task('dev:build', function(cb) {
    runSequence(['html', 'styles', 'copyJquery', 'jshint', 'images'], cb);
});

//Run the dev:build task, fire up a local server, and watch for changes
gulp.task('dev', ['dev:build', 'dev:serve'], function () {
    gulp.watch([htmlSource, htmlIncludesSource], ['html']);
    gulp.watch(stylesSource, ['styles']);
    gulp.watch(scriptsSource, ['jshint']);
    gulp.watch(imagesSource, ['copyImages']);
});

//** Production Tasks **//

//Clear out the dist folder before doing a build
gulp.task('prod:clean', function () {
    return del.sync(
        ['public/**', '!public']
    );
});

//Minify and add html to dist
gulp.task('prod:html', function() {
    return gulp.src(tmpPath + '*.html')
        .pipe(gulp.dest(distPath));
});

//Combine scripts and css wrapped in usemin block
gulp.task('prod:useMin', function () {
    return gulp.src(tmpPath + '*.html')
        .pipe(usemin({
            js: [sourcemaps.init(), uglify(), sourcemaps.write()],
            css: [minifyCSS(), 'concat']
        }))
        .pipe(gulp.dest(distPath));
});

//Process images
gulp.task('prod:images', function() {
    return gulp.src(tmpImagesSource)
        .pipe(gulp.dest(distPath + 'images'));
});

//Process fonts
gulp.task('prod:fonts', function() {
    return gulp.src(fontsSource)
        .pipe(gulp.dest(distPath + 'fonts'));
});


//create a prod task that runs devbuild then runs the other prod tasks above
gulp.task('prod', function(cb) {
    runSequence('prod:clean', 'dev:build', ['prod:useMin', 'prod:html', 'prod:images', 'prod:fonts'], cb);
});

//Fire up a prod server to make sure nothing is broken in the prod code
gulp.task('prod:serve', function () {
    browserSync({
        server: {
            baseDir: distPath
        }
    });
});
