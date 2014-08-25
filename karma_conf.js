// Karma configuration
// Generated on Sat Aug 16 2014 02:31:41 GMT+0400 (Московское время (зима))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [     
      'vendor/jquery-2.1.1.js',
      'vendor/jasmine-jquery-1.3.1.js',

      'vendor/angular-loader.min.js',
      'vendor/angular.min.js',
      'vendor/angular-route.min.js',
      'vendor/angular-animate.min.js',
      'vendor/angular-resource.min.js',
      'vendor/angular-cookies.min.js',
      'vendor/angular-touch.min.js',
      'vendor/angular-sanitize.min.js',
      'vendor/angular-mocks.js',
      
      'vendor/bootstrap.js',
      'vendor/moment.min.js',
      'vendor/underscore-min.js',
      'vendor/*.js',
      'css/*.css',
      //'index.html',
      'js/data.js',
      'js/*.js',
      'test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
