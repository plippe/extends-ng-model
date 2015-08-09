describe('ngModelCookie', function(){

  beforeEach(module('ngCookies'));
  beforeEach(module('extendsNgModel'));

  var compile, cookies, scope;
  beforeEach(inject(function($injector){
    compile = $injector.get('$compile');
    cookies = $injector.get('$cookies');
    scope = $injector.get('$rootScope');
  }));

  it('should behave the same as storage', inject(function() {
    var element = compile('<input type="text" ng-model="text" ng-model-cookie="" />')(scope);
    scope.text = 'abc';

    scope.$digest();
    expect(scope.text).toBe('abc');
    expect(element.val()).toBe('abc');

    cookies.put('text', '123');
    scope.$digest();
    expect(scope.text).toBe('123');
    expect(element.val()).toBe('123');

    element.val('abc');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.text).toBe('abc');
    expect(cookies.get('text')).toBe('abc');
  }));
});
