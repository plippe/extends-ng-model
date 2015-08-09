describe('ngModelStorage', function(){

  beforeEach(module('extendsNgModel'));

  var compile, scope, storage;
  beforeEach(inject(function($injector){
    compile = $injector.get('$compile');
    scope = $injector.get('$rootScope');

    fakeStorage = [];
    angular.module('extendsNgModel').directive('ngModelStorageTest', function(ngModelStorage) {
      var name = "ngModelStorageTest",
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

  it('should not change model, nor view if storage is undefined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-storage-test="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();
    expect(scope.text).toBe('hello world');
    expect(element.val()).toBe('hello world');
  }));

  it('should change model, and view if storage is defined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-storage-test="" />')(scope);
    scope.text = 'hello world';
    fakeStorage['text'] = 'new value';

    scope.$digest();
    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and view if storage changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-storage-test="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    fakeStorage['text'] = 'new value';
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and storage if view changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-storage-test="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    element.val('new value');
    element.triggerHandler('change');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(fakeStorage['text']).toBe('new value');
  }));

  it('should behave the same with numbers', inject(function() {
    var element = compile('<input type="number" ng-model="number" ng-model-storage-test="" />')(scope);
    scope.number = 123.45;

    scope.$digest();
    expect(scope.number).toBe(123.45);
    expect(element.val()).toBe('123.45');

    fakeStorage['number'] = 67;
    scope.$digest();
    expect(scope.number).toBe(67);
    expect(element.val()).toBe('67');

    element.val('8.90');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.number).toBe(8.90);
    expect(fakeStorage['number']).toBe(8.9);
  }));

  it('should behave the same with checkboxes', inject(function() {
    var element = compile('<input type="checkbox" ng-model="checkbox" ng-model-storage-test="" />')(scope);
    scope.checkbox = true;

    scope.$digest();
    expect(scope.checkbox).toBeTruthy();
    expect(element.attr('checked')).toBeTruthy();

    fakeStorage['checkbox'] = false;
    scope.$digest();
    expect(scope.checkbox).toBeFalsy();
    expect(element.attr('checked')).toBeFalsy();

    element.attr('checked', 'checked');
    element.triggerHandler('click');
    scope.$digest();
    expect(scope.checkbox).toBeTruthy();
    expect(fakeStorage['checkbox']).toBeTruthy();
  }));

  it('should behave the same with dates', inject(function() {
    var element = compile('<input type="date" ng-model="date" ng-model-storage-test="" />')(scope);
    scope.date = new Date('2000-01-01');

    scope.$digest();
    expect(scope.date).toEqual(new Date('2000-01-01'));
    expect(element.val()).toBe('2000-01-01');

    fakeStorage['date'] = '2001-01-01T00:00:00';
    scope.$digest();
    expect(scope.date).toEqual(new Date('2001-01-01'));
    expect(element.val()).toBe('2001-01-01');

    element.val('2002-01-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toEqual(new Date('2002-01-01'));
    expect(fakeStorage['date']).toBe('2002-01-01T00:00:00');
  }));

  it('should behave the same with emails', inject(function() {
    var element = compile('<input type="email" ng-model="email" ng-model-storage-test="" />')(scope);
    scope.email = 'ab@cd.ef';

    scope.$digest();
    expect(scope.email).toBe('ab@cd.ef');
    expect(element.val()).toBe('ab@cd.ef');

    fakeStorage['email'] = 'cb@ef.ab';
    scope.$digest();
    expect(scope.email).toBe('cb@ef.ab');
    expect(element.val()).toBe('cb@ef.ab');

    element.val('ef@ab.cd');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.email).toBe('ef@ab.cd');
    expect(fakeStorage['email']).toBe('ef@ab.cd');
  }));

  it('should behave the same with months', inject(function() {
    var element = compile('<input type="month" ng-model="month" ng-model-storage-test="" />')(scope);
    scope.month = new Date('2000-01');

    scope.$digest();
    expect(scope.month).toEqual(new Date('2000-01'));
    expect(element.val()).toBe('2000-01');

    fakeStorage['month'] = '2001-01-01T00:00:00';
    scope.$digest();
    expect(scope.month).toEqual(new Date('2001-01'));
    expect(element.val()).toBe('2001-01');

    element.val('2002-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.month).toEqual(new Date('2002-01'));
    expect(fakeStorage['month']).toBe('2002-01-01T00:00:00');
  }));

  it('should behave the same with weeks', inject(function() {
    var element = compile('<input type="week" ng-model="week" ng-model-storage-test="" />')(scope);
    scope.week = new Date('2000-01-03');

    scope.$digest();
    expect(scope.week).toEqual(new Date('2000-01-03'));
    expect(element.val()).toBe('2000-W01');

    fakeStorage['week'] = '2001-01-04T00:00:00';
    scope.$digest();
    expect(scope.week).toEqual(new Date('2001-01-04'));
    expect(element.val()).toBe('2001-W01');

    element.val('2002-W01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.week).toEqual(new Date('2002-01-03'));
    expect(fakeStorage['week']).toBe('2002-01-03T00:00:00');
  }));

  it('should behave the same with times', inject(function() {
    var element = compile('<input type="time" ng-model="time" ng-model-storage-test="" />')(scope);
    scope.time = new Date('1970-01-01 01:00:00');

    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 01:00:00'));
    expect(element.val()).toBe('01:00:00.000');

    fakeStorage['time'] = '1970-01-01T02:00:00';
    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 02:00:00'));
    expect(element.val()).toBe('02:00:00.000');

    element.val('03:00:00');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 03:00:00'));
    expect(fakeStorage['time']).toBe('1970-01-01T03:00:00');
  }));

  it('should behave the same with date times', inject(function() {
    var element = compile('<input type="datetime-local" ng-model="datetime" ng-model-storage-test="" />')(scope);
    scope.datetime = new Date('2000-01-01T01:00:00');

    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2000-01-01T01:00:00'));
    expect(element.val()).toBe('2000-01-01T01:00:00.000');

    fakeStorage['datetime'] = '2001-01-01T02:00:00';
    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2001-01-01T02:00:00'));
    expect(element.val()).toBe('2001-01-01T02:00:00.000');

    element.val('2003-01-01T03:00:00');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2003-01-01T03:00:00'));
    expect(fakeStorage['datetime']).toBe('2003-01-01T03:00:00');
  }));

  it('should behave the same with radio buttons', inject(function() {
    var elementA = compile('<input type="radio" value="a" ng-model="radio" ng-model-storage-test="">')(scope);
    var elementB = compile('<input type="radio" value="b" ng-model="radio" ng-model-storage-test="">')(scope);
    scope.radio = 'a';

    scope.$digest();
    expect(scope.radio).toBe('a');
    expect(elementA.attr('checked')).toBeTruthy();
    expect(elementB.attr('checked')).toBeFalsy();

    fakeStorage['radio'] = 'b';
    scope.$digest();
    expect(scope.radio).toBe('b');
    expect(elementA.attr('checked')).toBeFalsy();
    expect(elementB.attr('checked')).toBeTruthy();

    elementA.attr('checked', 'checked');
    elementA.triggerHandler('click');
    scope.$digest();
    expect(scope.radio).toEqual('a');
    expect(fakeStorage['radio']).toBe('a');
  }));

  it('should behave the same with urls', inject(function() {
    var element = compile('<input type="url" ng-model="url" ng-model-storage-test="" />')(scope);
    scope.url = 'http://google.com';

    scope.$digest();
    expect(scope.url).toBe('http://google.com');
    expect(element.val()).toBe('http://google.com');

    fakeStorage['url'] = 'http://yahoo.com';
    scope.$digest();
    expect(scope.url).toBe('http://yahoo.com');
    expect(element.val()).toBe('http://yahoo.com');

    element.val('http://bing.com');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.url).toBe('http://bing.com');
    expect(fakeStorage['url']).toBe('http://bing.com');
  }));

  it('should behave the same with select', inject(function() {
    var element = compile(' \
      <select ng-model="select" ng-model-storage-test=""> \
        <option value="a">A</option> \
        <option value="b">B</option> \
      </select> \
    ')(scope);
    scope.select = 'a';

    scope.$digest();
    expect(scope.select).toBe('a');
    expect(element.val()).toBe('a');

    fakeStorage['select'] = 'b';
    scope.$digest();
    expect(scope.select).toBe('b');
    expect(element.val()).toBe('b');

    element.val('a');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.select).toBe('a');
    expect(fakeStorage['select']).toBe('a');
  }));

  it('should behave the same with textarea', inject(function() {
    var element = compile('<textarea ng-model="textarea" ng-model-storage-test=""></textarea>')(scope);
    scope.textarea = 'a';

    scope.$digest();
    expect(scope.textarea).toBe('a');
    expect(element.val()).toBe('a');

    fakeStorage['textarea'] = 'b';
    scope.$digest();
    expect(scope.textarea).toBe('b');
    expect(element.val()).toBe('b');

    element.val('a');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.textarea).toBe('a');
    expect(fakeStorage['textarea']).toBe('a');
  }));

  it('should allow custom storage name', inject(function() {
    var element = compile('<input ng-model="input" ng-model-storage-test="search" />')(scope);
    scope.input = 'abc';

    scope.$digest();
    expect(scope.input).toBe('abc');
    expect(element.val()).toBe('abc');

    fakeStorage['input'] = '123';
    scope.$digest();
    expect(scope.input).toBe('abc');
    expect(element.val()).toBe('abc');

    fakeStorage['search'] = '123';
    scope.$digest();
    expect(scope.input).toBe('123');
    expect(element.val()).toBe('123');

    element.val('abc');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.input).toBe('abc');
    expect(fakeStorage['input']).toBe('123');
    expect(fakeStorage['search']).toBe('abc');
  }));
});
