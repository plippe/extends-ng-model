describe('ngModelCache', function(){

  beforeEach(module('extendsNgModel'));

  var compile, cache;
  beforeEach(inject(function($injector){
    cache = $injector.get('$cacheFactory')('ngModelCacheId');
    compile = $injector.get('$compile');
    scope = $injector.get('$rootScope');
  }));

  it('should not change model, nor view if cache is undefined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-cache="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();
    expect(scope.text).toBe('hello world');
    expect(element.val()).toBe('hello world');
  }));

  it('should change model, and view if cache is defined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-cache="" />')(scope);
    scope.text = 'hello world';
    cache.put('text', 'new value');

    scope.$digest();
    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and view if cache changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-cache="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    cache.put('text', 'new value');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and cache if view changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-cache="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    element.val('new value');
    element.triggerHandler('change');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(cache.get('text')).toBe('new value');
  }));

});
