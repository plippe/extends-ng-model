describe('ngModelLocation', function(){

  beforeEach(module('extendsNgModel'));

  var compile, location, scope;
  beforeEach(inject(function($injector){
    compile = $injector.get('$compile');
    location = $injector.get('$location');
    scope = $injector.get('$rootScope');
  }));

  it('should behave the same as storage', inject(function() {
    var element = compile('<input type="text" ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'abc';

    scope.$digest();
    expect(scope.text).toBe('abc');
    expect(element.val()).toBe('abc');

    location.search('text', '123');
    scope.$digest();
    expect(scope.text).toBe('123');
    expect(element.val()).toBe('123');

    element.val('abc');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.text).toBe('abc');
    expect(location.search().text).toBe('abc');
  }));
});
