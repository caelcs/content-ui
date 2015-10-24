var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    filter = require('gulp-filter'),
    minifyHTML = require('gulp-minify-html'),
    Server = require('karma').Server,
    runSequence = require('run-sequence'),
    del = require('del'),
    protractor = require("gulp-protractor").protractor;

var paths = {
    app_scripts: 'src/app/**/*.js',
    app_less: 'src/assets/less/**/*.*',
    app_images: 'src/assets/img/**/*.*',
    app_html: 'src/**/*.html',

    generated_app_html: 'build/**/*.html',
    generated_app_css: 'build/css/**/*.min.css',
    generated_lib_css: 'build/lib/css/**/*.min.css',
    generated_lib_scripts: 'build/lib/js/*.min.js',
    
    index: 'src/index.html',
    
    bower_fonts: 'build/libs/**/*.{ttf,woff,woff2,eof,svg}'
};

/**
 * Building assets
 */
gulp.task('build-assets', ['compile-less']);

gulp.task('compile-less', function() {
    return gulp.src(paths.app_less)
        .pipe(less())
        .pipe(gulp.dest('build/css/'));
});

/**
 * Build html, and concat resources files
 */
gulp.task('build-html', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat']
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('build-html-dev', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: ['concat'],
            css: ['concat'],
        }))
        .pipe(gulp.dest('build/'));
});

/**
 * Distribution of all the assets
 */
gulp.task('dist', ['lib-css', 'lib-scripts', 'lib-fonts', 'app-images', 'app-css', 'app-html']);

gulp.task('app-images', function() {
    return gulp.src(paths.app_images)
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('app-css', function() {
    return gulp.src(paths.generated_app_css)
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('app-html', function() {
    return gulp.src(paths.generated_app_html)
        .pipe(gulp.dest('dist/'));
});

gulp.task('lib-css', function() {
    return gulp.src(paths.generated_lib_css)
        .pipe(gulp.dest('dist/lib/css/'));
});

gulp.task('lib-fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib/'));
});

gulp.task('lib-scripts', function() {
    return gulp.src(paths.generated_lib_scripts)
        .pipe(gulp.dest('dist/lib/js/'));
});

/**
 * Clean tasks
 */
gulp.task('clean', function(callback) {
    return del(['build', 'dist'], callback);
});

/**
 * Watch custom files
 */
gulp.task('watchResources', function() {
    gulp.watch(paths.app_less, ['build-assets', 'dist']);
    gulp.watch(paths.app_images, ['app-images']);
    gulp.watch(paths.index, ['build-html-dev', 'dist']);
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['dist/**/*.*'])
        .pipe(connect.reload());
});

/**
 * Gulp tasks
 */
gulp.task('build', function(callback) {
  runSequence('clean', 
              'build-assets',
              'build-html',
              'dist',
              callback);
});

gulp.task('buildDev', function(callback) {
  runSequence('clean', 
              'build-assets',
              'build-html-dev',
              'dist',
              callback);
});

gulp.task('default', function(callback) {
  runSequence('build', 
              'webserver',
              'livereload',
              'watchResources',
              callback);
});

/**
 * Run test once and exit
 */
gulp.task('unit', function (done) {
  new Server({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('e2e', function (done) {
  var args = ['--baseUrl', 'http://127.0.0.1:8888'];
  gulp.src(["./tests/**/*.js"])
    .pipe(protractor({
      configFile: "tests/protractor.conf.js",
      args: args
    }))
    .on('error', function(e) { throw e; });
});
