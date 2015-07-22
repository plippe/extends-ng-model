angular.module('extendsNgModel').directive('ngModelLocation', function($location, ngModelConverter) {
  var link = function(scope, element, attributes, ngModelCtrl) {
    var inputType = (attributes.type || 'text'),
      searchKey = attributes.ngModelLocation || attributes.ngModel,
      searchValue = function() { return $location.search()[searchKey]; };

    var updateSearchValue = function(ngModelValue) {
      var value = ngModelConverter(ngModelValue, inputType);

      $location.search(searchKey, value);
      return ngModelValue;
    }

    var updateModelValue = function(searchValue) {
      var value = angular.isDefined(searchValue) ? searchValue : ngModelCtrl.$modelValue,
        updatedValue = ngModelConverter(value, inputType);

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
