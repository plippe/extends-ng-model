describe('ngModelTimestamp', function(){

  beforeEach(module('extendsNgModel'));

  var compile, scope;
  beforeEach(inject(function($injector){
    compile = $injector.get('$compile');
    scope = $injector.get('$rootScope');
  }));

  it('should convert date to timestamp', inject(function() {
    var element = compile('<input type="date" ng-model="date" ng-model-timestamp="" />')(scope);
    scope.date = 0;

    scope.$digest();
    expect(scope.date).toEqual(0);
    expect(element.val()).toBe('1970-01-01');

    element.val('2000-01-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toBe(946684800000);
  }));

  it('should convert month to timestamp', inject(function() {
    var element = compile('<input type="month" ng-model="date" ng-model-timestamp="" />')(scope);
    scope.date = 0;

    scope.$digest();
    expect(scope.date).toEqual(0);
    expect(element.val()).toBe('1970-01');

    element.val('2000-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toBe(946684800000);
  }));

  it('should convert week to timestamp', inject(function() {
    var element = compile('<input type="week" ng-model="date" ng-model-timestamp="" />')(scope);
    scope.date = 0;

    scope.$digest();
    expect(scope.date).toEqual(0);
    expect(element.val()).toBe('1970-W01');

    element.val('2000-W01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toBe(947116800000);
  }));

  it('should convert time to timestamp', inject(function() {
    var element = compile('<input type="time" ng-model="date" ng-model-timestamp="" />')(scope);
    scope.date = 0;

    scope.$digest();
    expect(scope.date).toEqual(0);
    expect(element.val()).toBe('00:00:00.000');

    element.val('01:02:03');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toBe(3723000);
  }));

  it('should convert datetime-local to timestamp', inject(function() {
    var element = compile('<input type="datetime-local" ng-model="date" ng-model-timestamp="" />')(scope);
    scope.date = 0;

    scope.$digest();
    expect(scope.date).toEqual(0);
    expect(element.val()).toBe('1970-01-01T00:00:00.000');

    element.val('2000-01-01T00:00:00');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toBe(946684800000);
  }));

});
