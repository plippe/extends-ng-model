angular.module('extendsNgModel').directive('ngModelTimestamp', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attributes, ngModelCtrl) {
      var toTimestamp = function(modelValue) {
        return angular.isDefined(modelValue.getTime) ?
          modelValue.getTime() :
          modelValue;
      }

      var fromTimestamp = function(viewValue) {
        return angular.isNumber(viewValue) ?
          new Date(viewValue) :
          viewValue;
      }

      ngModelCtrl.$formatters.push(fromTimestamp);
      ngModelCtrl.$parsers.push(toTimestamp);
    }
  };
});
