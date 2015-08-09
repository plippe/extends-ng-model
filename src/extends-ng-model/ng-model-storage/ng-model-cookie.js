angular.module('extendsNgModel').directive('ngModelCookie', function($cookies, ngModelStorage) {
  var name = "ngModelCookie",
    getValue = function(key) { return function() { return $cookies.get(key); } },
    putValue = function(key, value) { $cookies.put(key, value); },
    link = ngModelStorage(name, getValue, putValue);

  return {
    require: 'ngModel',
    restrict: 'A',
    link: link
  };
});
