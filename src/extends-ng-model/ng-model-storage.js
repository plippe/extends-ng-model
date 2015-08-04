angular.module('extendsNgModel').factory('ngModelStorage', function(ngModelConverter) {
  var constructor = function(storageName, getValue, putValue) {
    var link = function(scope, element, attributes, ngModelCtrl) {
      var inputType = (attributes.type || 'text'),
        storageKey = attributes[storageName] || attributes.ngModel,
        storageValue = getValue(storageKey);

      var updateStorageValue = function(ngModelValue) {
        var updatedValue = ngModelConverter(storageName, inputType, ngModelValue);

        putValue(storageKey, updatedValue);
        return ngModelValue;
      }

      var updateModelValue = function(storageValue) {
        var value = angular.isDefined(storageValue) ? storageValue : ngModelCtrl.$modelValue,
          updatedValue = ngModelConverter(storageName, inputType, value);

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
