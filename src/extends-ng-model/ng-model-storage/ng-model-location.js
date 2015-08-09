angular.module('extendsNgModel').directive('ngModelLocation', function($location, ngModelStorage) {
  var name = "ngModelLocation",
    getValue = function(key) { return function() { return $location.search()[key]; } },
    putValue = function(key, value) { $location.search(key, value); },
    link = ngModelStorage(name, getValue, putValue);

  return {
    require: 'ngModel',
    restrict: 'A',
    link: link
  };
});
