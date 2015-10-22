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
    googleWebFonts = require('gulp-google-webfonts');

var paths = {
    scripts: 'src/app/**/*.js',
    styles: 'src/assets/less/**/*.*',
    css: 'src/assets/css/app.min.js',
    images: 'src/assets/img/**/*.*',
    templates: 'src/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'src/assets/libs/**/*.{ttf,woff,woff2,eof,svg}'
};

/**
 * Building assets
 */
gulp.task('build-assets', ['compile-less']);

gulp.task('compile-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('src/assets/css'));
});

/**
 * Build html, and concat resources files
 */
gulp.task('dist-app', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist-app-dev', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: ['concat'],
            css: ['concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Handle custom files
 */
gulp.task('dist', ['custom-images', 'vendor-fonts', 'custom-css']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('custom-css', function() {
    return gulp.src(paths.css)
        .pipe(gulp.dest('dist/css'));
});

gulp.task('vendor-fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib/'));
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
gulp.task('build', ['build-assets', 'dist-app', 'dist']);
gulp.task('buildDev', ['build-assets', 'dist-app-dev', 'dist']);
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
