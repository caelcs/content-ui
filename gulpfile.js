var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHtml = require('gulp-minify-html'),
    Server = require('karma').Server,
    runSequence = require('run-sequence'),
    del = require('del'),
    html2Js = require('gulp-ng-html2js'),
    argv = require('yargs').argv,
    fs = require('fs'),
    replace = require('gulp-replace-task'),
    protractor = require("gulp-protractor").protractor;


var paths = {
    app_scripts: [
        'src/app/constants.js',
        'src/app/**/*module.js',
        'src/app/components/**/*.js',
        '!src/app/**/*.spec.js'
    ],
    build_app_scripts: [
        'build/app/app.min.js',
        'build/app/templates.min.js'
    ],
    app_less: 'src/assets/less/**/*.*',
    app_images: 'src/assets/img/**/*.*',
    app_html: 'src/app/**/*.html',
    
    libs_css: [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/animate.css/animate.min.css',
        'bower_components/angular-ui-notification/dist/angular-ui-notification.min.css'

    ],
    libs_scripts: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/jsrasign/jsrasign-latest-all-min.js',
        'bower_components/ngstorage/ngStorage.js',
        'bower_components/oauth-ng/dist/oauth-ng.js',
        'bower_components/lodash/lodash.js',
        'bower_components/restangular/dist/restangular.js',
        'bower_components/angular-clipboard/angular-clipboard.js',
        'bower_components/angular-ui-notification/dist/angular-ui-notification.js'
    ],

    index: 'src/index.html',
    
    bower_fonts: 'bower_components/**/*.{ttf,woff,woff2,eof,svg}'
};

gulp.task('build', function(callback) {
  runSequence('clean', 
            [
                'build-css', 
                'build-templates',
                'build-app', 
                'build-index', 
                'build-libs-css', 
                'build-libs-js', 
                'build-images', 
                'build-libs-font',
                'replace-constants'
            ],
            'minify',
            callback);
});

gulp.task('buildDev', function(callback) {
  runSequence('clean', 
            [
                'build-css', 
                'build-templates-dev',
                'build-app', 
                'build-index', 
                'build-libs-css', 
                'build-libs-js', 
                'build-images', 
                'build-libs-font',
                'replace-constants'
            ],
            callback);
});

gulp.task('clean', function(callback) {
    return del(['build'], callback);
});

gulp.task('build-css', function() {
    return gulp.src(paths.app_less)
        .pipe(less())
        .pipe(concat("app.min.css"))
        .pipe(gulp.dest('build/assets/css'));
});

gulp.task('build-templates', function() {
    return gulp.src(paths.app_html)
        .pipe(minifyHtml({
          empty: true,
          spare: true,
          quotes: true
        }))
        .pipe(html2Js({
          moduleName: "app.templates",
          prefix: "/"
        }))
        .pipe(concat("templates.min.js"))
        .pipe(gulp.dest('build/app'));
});

gulp.task('build-templates-dev', function() {
    return gulp.src(paths.app_html)
        .pipe(html2Js({
          moduleName: "app.templates",
          prefix: "/"
        }))
        .pipe(concat("templates.min.js"))
        .pipe(gulp.dest('build/app'));
});

gulp.task('build-app', function() {
    return gulp.src(paths.app_scripts)
        .pipe(concat("app.min.js"))
        .pipe(gulp.dest('build/app'));
});

gulp.task('build-libs-js', function() {
    return gulp.src(paths.libs_scripts)
        .pipe(concat("vendor.min.js"))
        .pipe(gulp.dest('build/assets/libs/js'));
});

gulp.task('build-images', function() {
    return gulp.src(paths.app_images)
        .pipe(gulp.dest('build/assets/img'));
});

gulp.task('build-libs-font', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/'
        }))
        .pipe(gulp.dest('build/assets/libs/fonts'));
});

gulp.task('build-libs-css', function() {
    return gulp.src(paths.libs_css)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('build/assets/libs/css'));
});

gulp.task('build-index', function() {
    return gulp.src(paths.index)
        .pipe(gulp.dest('build'));
});

gulp.task('minify', ['minify-html', 'minify-css', 'minify-js'])

gulp.task('minify-html', function() {
    return gulp.src('build/index.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('build'));     
});

gulp.task('minify-css', function() {
    return gulp.src('build/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('build'));     
});

gulp.task('minify-js', function() {
    return gulp.src('build/**/*.js')
        .pipe(minifyJs())
        .pipe(gulp.dest('build'));     
});

gulp.task('watchResources', function() {
    gulp.watch(paths.app_less, ['build-css']);
    gulp.watch(paths.app_images, ['build-images']);
    gulp.watch(paths.app_html, ['build-templates']);
    gulp.watch(paths.app_scripts, ['build-app']);
    gulp.watch(paths.index, ['build-index']);
});

gulp.task('webserver', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 8888,
        fallback: 'build/index.html'
    });
});

gulp.task('livereload', function() {
    gulp.src(['build/**/*.*'])
        .pipe(connect.reload());
});

gulp.task('default', function(callback) {
  runSequence('buildDev', 
              'webserver',
              'livereload',
              'watchResources',
              callback);
});

gulp.task('startLive', function(callback) {
  runSequence('build',
              'webserver',
              'livereload',
              callback);
});

gulp.task('replace-constants', function () {  
    // Get the environment from the command line
    var envFile = argv.env || './config/localdev.json';
    // Read the settings from the right file
    var settings = JSON.parse(fs.readFileSync(envFile, 'utf8'));

    //Replace each placeholder with the correct value for the variable.  
    gulp.src(paths.build_app_scripts)  
        .pipe(replace({
            patterns: [
                {
                    match: 'apiUrl',
                    replacement: settings.apiUrl
                },
                {
                    match: 'oauthUrl',
                    replacement: settings.oauthUrl
                }]
            }))
        .pipe(gulp.dest('build/app'));
});

gulp.task('unit', function (done) {
  new Server({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    },
    function() {
        done();
    }).start();
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
