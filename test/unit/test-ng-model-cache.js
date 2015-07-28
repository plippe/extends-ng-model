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

  it('should behave the same with dates', inject(function() {
    var element = compile('<input type="date" ng-model="date" ng-model-cache="" />')(scope);
    scope.date = new Date('2000-01-01');

    scope.$digest();
    expect(scope.date).toEqual(new Date('2000-01-01'));
    expect(element.val()).toBe('2000-01-01');

    cache.put('date', '2001-01-01');
    scope.$digest();
    expect(scope.date).toEqual(new Date('2001-01-01'));
    expect(element.val()).toBe('2001-01-01');

    element.val('2002-01-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toEqual(new Date('2002-01-01'));
    expect(cache.get('date')).toBe('2002-01-01');
  }));

  it('should behave the same with emails', inject(function() {
    var element = compile('<input type="email" ng-model="email" ng-model-cache="" />')(scope);
    scope.email = 'ab@cd.ef';

    scope.$digest();
    expect(scope.email).toBe('ab@cd.ef');
    expect(element.val()).toBe('ab@cd.ef');

    cache.put('email', 'cb@ef.ab');
    scope.$digest();
    expect(scope.email).toBe('cb@ef.ab');
    expect(element.val()).toBe('cb@ef.ab');

    element.val('ef@ab.cd');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.email).toBe('ef@ab.cd');
    expect(cache.get('email')).toBe('ef@ab.cd');
  }));

  it('should behave the same with months', inject(function() {
    var element = compile('<input type="month" ng-model="month" ng-model-cache="" />')(scope);
    scope.month = new Date('2000-01');

    scope.$digest();
    expect(scope.month).toEqual(new Date('2000-01'));
    expect(element.val()).toBe('2000-01');

    cache.put('month', '2001-01');
    scope.$digest();
    expect(scope.month).toEqual(new Date('2001-01'));
    expect(element.val()).toBe('2001-01');

    element.val('2002-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.month).toEqual(new Date('2002-01'));
    expect(cache.get('month')).toBe('2002-01');
  }));

  it('should behave the same with weeks', inject(function() {
    var element = compile('<input type="week" ng-model="week" ng-model-cache="" />')(scope);
    scope.week = new Date('2000-01-03');

    scope.$digest();
    expect(scope.week).toEqual(new Date('2000-01-03'));
    expect(element.val()).toBe('2000-W01');

    cache.put('week', '2001-W01');
    scope.$digest();
    expect(scope.week).toEqual(new Date('2001-01-04'));
    expect(element.val()).toBe('2001-W01');

    element.val('2002-W01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.week).toEqual(new Date('2002-01-03'));
    expect(cache.get('week')).toBe('2002-W01');
  }));

  it('should behave the same with times', inject(function() {
    var element = compile('<input type="time" ng-model="time" ng-model-cache="" />')(scope);
    scope.time = new Date('1970-01-01 01:00:00');

    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 01:00:00'));
    expect(element.val()).toBe('01:00:00');

    cache.put('time', '02:00:00');
    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 02:00:00'));
    expect(element.val()).toBe('02:00:00');

    element.val('03:00:00');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 03:00:00'));
    expect(cache.get('time')).toBe('03:00:00');
  }));

  it('should behave the same with date times', inject(function() {
    var element = compile('<input type="datetime-local" ng-model="datetime" ng-model-cache="" />')(scope);
    scope.datetime = new Date('2000-01-01T01:00:00');

    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2000-01-01T01:00:00'));
    expect(element.val()).toBe('2000-01-01T01:00:00');

    cache.put('datetime', '2001-01-01T02:00:00');
    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2001-01-01T02:00:00'));
    expect(element.val()).toBe('2001-01-01T02:00:00');

    element.val('2003-01-01T03:00:00');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2003-01-01T03:00:00'));
    expect(cache.get('datetime')).toBe('2003-01-01T03:00:00');
  }));

});
