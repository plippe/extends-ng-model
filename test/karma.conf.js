module.exports = function(config){
  config.set({
    basePath : '../',
    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'dist/**/*.js',
      'test/**/test-*.js'
    ],
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-coverage',
      'karma-coveralls',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-spec-reporter'
    ],

    preprocessors: { 'dist/**/*.js': 'coverage' },
    reporters: ['spec', 'coverage', 'coveralls'],
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    }
  });
};
