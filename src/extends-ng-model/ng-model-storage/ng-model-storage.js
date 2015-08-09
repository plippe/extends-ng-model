angular.module('extendsNgModel').factory('ngModelStorage', function($parse, ngModelConverter) {
  var constructor = function(storageName, getValue, putValue) {
    var link = function(scope, element, attributes, ngModelCtrl) {
      var storageKey = attributes[storageName] || attributes.ngModel,
        storageValue = getValue(storageKey);

      var updateStorageValue = function(ngModelValue) {
        var updatedValue = ngModelConverter.toStorage(ngModelValue, attributes);

        putValue(storageKey, updatedValue);
        return ngModelValue;
      }

      var updateModelValue = function(storageValue) {
        var value = angular.isDefined(storageValue) ? storageValue : ngModelCtrl.$modelValue,
          updatedValue = ngModelConverter.fromStorage(value, attributes);

        ngModelCtrl.$parsers.map(function(parser) {
          updatedValue = parser(updatedValue) || updatedValue;
        });

        $parse(attributes.ngModel).assign(scope, updatedValue);
      }

      ngModelCtrl.$parsers.push(updateStorageValue);
      scope.$watch(storageValue, updateModelValue);
    }

    return link;
  }

  return constructor;
});
