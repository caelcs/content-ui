module.exports = function(config){
  config.set({

    basePath : '.',

    files : [
      '../dist/lib/js/vendor.min.js',
      '../src/assets/libs/angular-mocks/angular-mocks.js',
      '../dist/lib/js/app.min.js',
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

    reporters: ['junit'],

    junitReporter : {
      outputDir: '../test_out/xml',
      outputFile: 'junit.xml',
      suite: 'junit'
    }

  });
};
