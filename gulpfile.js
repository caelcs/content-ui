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
    scripts: 'src/app/**/*.js',
    styles: 'src/assets/less/**/*.*',
    css: 'build/css/**/*.min.css',
    lib_css: 'build/lib/css/**/*.min.css',
    images: 'src/assets/img/**/*.*',
    templates: 'src/**/*.html',
    index: 'src/index.html',
    auto_enerated_assets: 'build/**/*.{html,js}',
    bower_fonts: 'build/libs/**/*.{ttf,woff,woff2,eof,svg}'
};

/**
 * Building assets
 */
gulp.task('build-assets', ['compile-less']);

gulp.task('compile-less', function() {
    return gulp.src(paths.styles)
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
 * Handle custom files
 */
gulp.task('build-dist', ['custom-images', 'vendor-fonts', 'custom-css', 'lib-css', 'auto-generated-assets']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('custom-css', function() {
    return gulp.src(paths.css)
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('lib-css', function() {
    return gulp.src(paths.lib_css)
        .pipe(gulp.dest('dist/lib/css/'));
});

gulp.task('vendor-fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib/'));
});

gulp.task('auto-generated-assets', function() {
    return gulp.src(paths.auto_enerated_assets)
        .pipe(gulp.dest('dist/'));
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
    gulp.watch(paths.styles, ['compile-less']);
    gulp.watch(paths.images, ['custom-images']);
    gulp.watch(paths.index, ['usemin']);
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
              'build-dist',
              callback);
});

gulp.task('buildDev', ['build-assets', 'build-html-dev', 'dist']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watchResources']);

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
