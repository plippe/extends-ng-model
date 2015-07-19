angular.module('extendsNgModel').directive('ngModelLocation', function($location, $filter) {
  var link = function(scope, element, attributes, ngModelCtrl) {
    var searchKey = attributes.ngModelLocation || attributes.ngModel;
    var searchValue = function() { return $location.search()[searchKey]; }

    var inputType = (attributes.type || 'text').toLowerCase();
    var updateValueBasedOnInputType = function(value) {
      switch(inputType) {
        case 'checkbox':
          return value === true || value === 'true';
        case 'date':
          return $filter('date')(value, 'yyyy-MM-dd');
        case 'month':
          return $filter('date')(value, 'yyyy-MM');
        default :
          return value;
      }
    }

    var updateSearchValue = function(ngModelValue) {
      var value = updateValueBasedOnInputType(ngModelValue);

      $location.search(searchKey, value);
      return ngModelValue;
    }

    var updateModelValue = function(searchValue) {
      var value = angular.isDefined(searchValue) ? searchValue : ngModelCtrl.$modelValue,
        updatedValue = updateValueBasedOnInputType(value);

      ngModelCtrl.$setViewValue(updatedValue, this);
      ngModelCtrl.$render();
    }

    ngModelCtrl.$parsers.push(updateSearchValue);
    scope.$watch(searchValue, updateModelValue);
  }

  return {
    require: 'ngModel',
    restrict: 'A',
    link: link
  };
});
