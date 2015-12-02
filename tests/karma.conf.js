module.exports = function(config){
  config.set({

    basePath : '.',

    files : [
      '../build/assets/libs/js/vendor.min.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../build/app/app.min.js',
      '../build/app/templates.min.js',
      '../src/app/**/*.spec.js'
    ],

    port : 8888,

    logLevel: config.LOG_DEBUG,

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    reporters: ['progress','junit'],

    junitReporter : {
      outputDir: '../test_out/xml',
      outputFile: 'junit.xml',
      suite: 'junit',
      useBrowserName: true
    }

  });
};
