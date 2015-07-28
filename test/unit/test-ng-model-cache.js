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

  it('should behave the same with numbers', inject(function() {
    var element = compile('<input type="number" ng-model="number" ng-model-cache="" />')(scope);
    scope.number = 123.45;

    scope.$digest();
    expect(scope.number).toBe(123.45);
    expect(element.val()).toBe('123.45');

    cache.put('number', 67);
    scope.$digest();
    expect(scope.number).toBe(67);
    expect(element.val()).toBe('67');

    element.val('8.90');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.number).toBe(8.90);
    expect(cache.get('number')).toBe(8.90);
  }));

  it('should behave the same with checkboxes', inject(function() {
    var element = compile('<input type="checkbox" ng-model="checkbox" ng-model-cache="" />')(scope);
    scope.checkbox = true;

    scope.$digest();
    expect(scope.checkbox).toBeTruthy();
    expect(element.attr('checked')).toBeTruthy();

    cache.put('checkbox', false);
    scope.$digest();
    expect(scope.checkbox).toBeFalsy();
    expect(element.attr('checked')).toBeFalsy();

    element.attr('checked', 'checked');
    element.triggerHandler('click');
    scope.$digest();
    expect(scope.checkbox).toBeTruthy();
    expect(cache.get('checkbox')).toBeTruthy();
  }));

});
