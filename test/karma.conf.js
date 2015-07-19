module.exports = function(config){
  config.set({
    basePath : '../',
    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'dist/**/*.js',
      'test/**/test-*.js'
    ],
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  });
};
