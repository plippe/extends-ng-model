describe('ngModelTimestamp', function(){

  beforeEach(module('extendsNgModel'));

  var compile, scope, storage;
  beforeEach(inject(function($injector){
    compile = $injector.get('$compile');
    scope = $injector.get('$rootScope');

    fakeStorage = [];
    angular.module('extendsNgModel').directive('ngModelStorageTimestamp', function(ngModelStorage) {
      var name = "ngModelTest",
        getValue = function(key) { return function() { return fakeStorage[key]; } },
        putValue = function(key, value) { fakeStorage[key] = value; },
        link = ngModelStorage(name, getValue, putValue);

      return {
        require: 'ngModel',
        restrict: 'A',
        link: link
      };
    });
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

  it('should behave the same as storage and store a timestamp', inject(function() {
    var element = compile('<input type="date" ng-model="date" ng-model-storage-timestamp="" ng-model-timestamp="" />')(scope);
    scope.date = 0;

    scope.$digest();
    expect(scope.date).toBe(0);
    expect(element.val()).toBe('1970-01-01');

    fakeStorage['date'] = 946684800000;
    scope.$digest();
    expect(scope.date).toBe(946684800000);
    expect(element.val()).toBe('2000-01-01');

    element.val('1970-01-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toBe(0);
    expect(fakeStorage['date']).toBe(0);
  }));

  it('should not throw an error when field is cleared', inject(function() {
    var element = compile('<input type="date" ng-model="date" ng-model-timestamp="" />')(scope);
    scope.date = 0;

    scope.$digest();
    expect(scope.date).toBe(0);
    expect(element.val()).toBe('1970-01-01');

    scope.date = null;
    scope.$digest();
    expect(scope.date).toBe(null);
    expect(element.val()).toBe('');

    scope.date = 946684800000;
    scope.$digest();
    expect(scope.date).toBe(946684800000);
    expect(element.val()).toBe('2000-01-01');

    element.val('');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toBe(null);
  }));

});
