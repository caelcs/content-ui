module.exports = function(config){
  config.set({

    basePath : '.',

    files : [
      '../src/assets/libs/angular/angular.js',
      '../src/assets/libs/angular-bootstrap/ui-bootstrap-tpls.js',
      '../src/assets/libs/angular-cookies/angular-cookies.js',
      '../src/assets/libs/angular-ui-router/release/angular-ui-router.js',
      '../src/app/**/!*.spec.js',
      '../src/app/**/*.spec.js'
    ],

    port : 8888,

    logLevel: config.LOG_INFO,

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    reporters: ['junit'],

    junitReporter : {
      outputDir: '../test_out/xml',
      outputFile: 'junit.xml',
      suite: 'junit'
    }

  });
};
