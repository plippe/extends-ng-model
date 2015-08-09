angular.module('extendsNgModel')
  .constant('ngModelCacheId', 'ngModelCacheId')
  .directive('ngModelCache', function($cacheFactory, ngModelStorage, ngModelCacheId) {
    var name = "ngModelCache",
      cache = $cacheFactory.get(ngModelCacheId) || $cacheFactory(ngModelCacheId),
      getValue = function(key) { return function() { return cache.get(key); } },
      putValue = function(key, value) { cache.put(key, value); },
      link = ngModelStorage(name, getValue, putValue);

    return {
      require: 'ngModel',
      restrict: 'A',
      link: link
    };
  });
