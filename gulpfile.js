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
    protractor = require("gulp-protractor").protractor;

var paths = {
    scripts: 'src/app/**/*.js',
    styles: 'src/assets/less/**/*.*',
    images: 'src/assets/img/**/*.*',
    templates: 'src/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'src/assets/libs/**/*.{ttf,woff,woff2,eof,svg}',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('usemin-dev', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: ['concat'],
            css: ['concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib/'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-less']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

/**
 * Watch custom files
 */
gulp.task('watchResources', function() {
    gulp.watch(paths.images, ['custom-images']);
    gulp.watch(paths.styles, ['custom-less']);
    gulp.watch(paths.scripts, ['custom-js']);
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
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('buildDev', ['usemin-dev', 'build-assets', 'build-custom']);
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
