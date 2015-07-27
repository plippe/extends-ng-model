angular.module('extendsNgModel').factory('ngModelStorage', function(ngModelConverter) {
  var constructor = function(name, getValue, putValue) {
    var link = function(scope, element, attributes, ngModelCtrl) {
      var inputType = (attributes.type || 'text'),
        storageKey = attributes[name] || attributes.ngModel,
        storageValue = getValue(storageKey);

      var updateStorageValue = function(ngModelValue) {
        var value = ngModelConverter(ngModelValue, inputType);

        putValue(storageKey, value);
        return ngModelValue;
      }

      var updateModelValue = function(value) {
        var value = angular.isDefined(value) ? value : ngModelCtrl.$modelValue,
          updatedValue = ngModelConverter(value, inputType);

        ngModelCtrl.$setViewValue(updatedValue, this);
        ngModelCtrl.$render();
      }

      ngModelCtrl.$parsers.push(updateStorageValue);
      scope.$watch(storageValue, updateModelValue);
    }

    return link;
  }

  return constructor;
});
