describe('ngModelLocation', function(){

  beforeEach(module('extendsNgModel'));

  var compile, location;
  beforeEach(inject(function($injector){
    compile = $injector.get('$compile');
    location = $injector.get('$location');
    scope = $injector.get('$rootScope');
  }));

  it('should not change model, nor view if search is undefined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();
    expect(scope.text).toBe('hello world');
    expect(element.val()).toBe('hello world');
  }));

  it('should change model, and view if search is defined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'hello world';
    location.search('text', 'new value');

    scope.$digest();
    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and view if search changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    location.search('text', 'new value');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and search if view changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    element.val('new value');
    element.triggerHandler('change');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(location.search().text).toBe('new value');
  }));

  it('should behave the same with numbers', inject(function() {
    var element = compile('<input type="number" ng-model="number" ng-model-location="" />')(scope);
    scope.number = 123.45;

    scope.$digest();
    expect(scope.number).toBe(123.45);
    expect(element.val()).toBe('123.45');

    location.search('number', 67);
    scope.$digest();
    expect(scope.number).toBe(67);
    expect(element.val()).toBe('67');

    element.val('8.90');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.number).toBe(8.90);
    expect(location.search().number).toBe(8.90);
  }));

});
