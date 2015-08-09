describe('ngModelCache', function(){

  beforeEach(module('extendsNgModel'));

  var compile, cache;
  beforeEach(inject(function($injector){
    cache = $injector.get('$cacheFactory')('ngModelCacheId');
    compile = $injector.get('$compile');
    scope = $injector.get('$rootScope');
  }));

  it('should behave the same as storage', inject(function() {
    var element = compile('<input type="text" ng-model="text" ng-model-cache="" />')(scope);
    scope.text = 'abc';

    scope.$digest();
    expect(scope.text).toBe('abc');
    expect(element.val()).toBe('abc');

    cache.put('text', '123');
    scope.$digest();
    expect(scope.text).toBe('123');
    expect(element.val()).toBe('123');

    element.val('abc');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.text).toBe('abc');
    expect(cache.get('text')).toBe('abc');
  }));

});
