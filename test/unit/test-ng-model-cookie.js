describe('ngModelCookie', function(){

  beforeEach(module('ngCookies'));
  beforeEach(module('extendsNgModel'));

  var compile, cookies, scope;
  beforeEach(inject(function($injector){
    compile = $injector.get('$compile');
    cookies = $injector.get('$cookies');
    scope = $injector.get('$rootScope');
  }));

  it('should not change model, nor view if cookie is undefined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-cookie="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();
    expect(scope.text).toBe('hello world');
    expect(element.val()).toBe('hello world');
  }));

  it('should change model, and view if cookie is defined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-cookie="" />')(scope);
    scope.text = 'hello world';
    cookies.put('text', 'new value');

    scope.$digest();
    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and view if cookie changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-cookie="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    cookies.put('text', 'new value');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and cookie if view changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-cookie="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    element.val('new value');
    element.triggerHandler('change');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(cookies.get('text')).toBe('new value');
  }));

  it('should behave the same with numbers', inject(function() {
    var element = compile('<input type="number" ng-model="number" ng-model-cookie="" />')(scope);
    scope.number = 123.45;

    scope.$digest();
    expect(scope.number).toBe(123.45);
    expect(element.val()).toBe('123.45');

    cookies.put('number', 67);
    scope.$digest();
    expect(scope.number).toBe(67);
    expect(element.val()).toBe('67');

    element.val('8.90');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.number).toBe(8.90);
    expect(cookies.get('number')).toBe('8.9');
  }));

  it('should behave the same with checkboxes', inject(function() {
    var element = compile('<input type="checkbox" ng-model="checkbox" ng-model-cookie="" />')(scope);
    scope.checkbox = true;

    scope.$digest();
    expect(scope.checkbox).toBeTruthy();
    expect(element.attr('checked')).toBeTruthy();

    cookies.put('checkbox', false);
    scope.$digest();
    expect(scope.checkbox).toBeFalsy();
    expect(element.attr('checked')).toBeFalsy();

    element.attr('checked', 'checked');
    element.triggerHandler('click');
    scope.$digest();
    expect(scope.checkbox).toBeTruthy();
    expect(cookies.get('checkbox')).toBeTruthy();
  }));

  it('should behave the same with dates', inject(function() {
    var element = compile('<input type="date" ng-model="date" ng-model-cookie="" />')(scope);
    scope.date = new Date('2000-01-01');

    scope.$digest();
    expect(scope.date).toEqual(new Date('2000-01-01'));
    expect(element.val()).toBe('2000-01-01');

    cookies.put('date', '2001-01-01');
    scope.$digest();
    expect(scope.date).toEqual(new Date('2001-01-01'));
    expect(element.val()).toBe('2001-01-01');

    element.val('2002-01-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toEqual(new Date('2002-01-01'));
    expect(cookies.get('date')).toBe('2002-01-01');
  }));

  it('should behave the same with emails', inject(function() {
    var element = compile('<input type="email" ng-model="email" ng-model-cookie="" />')(scope);
    scope.email = 'ab@cd.ef';

    scope.$digest();
    expect(scope.email).toBe('ab@cd.ef');
    expect(element.val()).toBe('ab@cd.ef');

    cookies.put('email', 'cb@ef.ab');
    scope.$digest();
    expect(scope.email).toBe('cb@ef.ab');
    expect(element.val()).toBe('cb@ef.ab');

    element.val('ef@ab.cd');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.email).toBe('ef@ab.cd');
    expect(cookies.get('email')).toBe('ef@ab.cd');
  }));

  it('should behave the same with months', inject(function() {
    var element = compile('<input type="month" ng-model="month" ng-model-cookie="" />')(scope);
    scope.month = new Date('2000-01');

    scope.$digest();
    expect(scope.month).toEqual(new Date('2000-01'));
    expect(element.val()).toBe('2000-01');

    cookies.put('month', '2001-01');
    scope.$digest();
    expect(scope.month).toEqual(new Date('2001-01'));
    expect(element.val()).toBe('2001-01');

    element.val('2002-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.month).toEqual(new Date('2002-01'));
    expect(cookies.get('month')).toBe('2002-01');
  }));

  it('should behave the same with weeks', inject(function() {
    var element = compile('<input type="week" ng-model="week" ng-model-cookie="" />')(scope);
    scope.week = new Date('2000-01-03');

    scope.$digest();
    expect(scope.week).toEqual(new Date('2000-01-03'));
    expect(element.val()).toBe('2000-W01');

    cookies.put('week', '2001-W01');
    scope.$digest();
    expect(scope.week).toEqual(new Date('2001-01-04'));
    expect(element.val()).toBe('2001-W01');

    element.val('2002-W01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.week).toEqual(new Date('2002-01-03'));
    expect(cookies.get('week')).toBe('2002-W01');
  }));

  it('should behave the same with times', inject(function() {
    var element = compile('<input type="time" ng-model="time" ng-model-cookie="" />')(scope);
    scope.time = new Date('1970-01-01 01:00:00');

    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 01:00:00'));
    expect(element.val()).toBe('01:00:00');

    cookies.put('time', '02:00:00');
    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 02:00:00'));
    expect(element.val()).toBe('02:00:00');

    element.val('03:00:00');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.time).toEqual(new Date('1970-01-01 03:00:00'));
    expect(cookies.get('time')).toBe('03:00:00');
  }));

  it('should behave the same with date times', inject(function() {
    var element = compile('<input type="datetime-local" ng-model="datetime" ng-model-cookie="" />')(scope);
    scope.datetime = new Date('2000-01-01T01:00:00');

    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2000-01-01T01:00:00'));
    expect(element.val()).toBe('2000-01-01T01:00:00');

    cookies.put('datetime', '2001-01-01T02:00:00');
    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2001-01-01T02:00:00'));
    expect(element.val()).toBe('2001-01-01T02:00:00');

    element.val('2003-01-01T03:00:00');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.datetime).toEqual(new Date('2003-01-01T03:00:00'));
    expect(cookies.get('datetime')).toBe('2003-01-01T03:00:00');
  }));

  it('should behave the same with radio buttons', inject(function() {
    var elementA = compile('<input type="radio" value="a" ng-model="radio" ng-model-cookie="">')(scope);
    var elementB = compile('<input type="radio" value="b" ng-model="radio" ng-model-cookie="">')(scope);
    scope.radio = 'a';

    scope.$digest();
    expect(scope.radio).toBe('a');
    expect(elementA.attr('checked')).toBeTruthy();
    expect(elementB.attr('checked')).toBeFalsy();

    cookies.put('radio', 'b');
    scope.$digest();
    expect(scope.radio).toBe('b');
    expect(elementA.attr('checked')).toBeFalsy();
    expect(elementB.attr('checked')).toBeTruthy();

    elementA.attr('checked', 'checked');
    elementA.triggerHandler('click');
    scope.$digest();
    expect(scope.radio).toEqual('a');
    expect(cookies.get('radio')).toBe('a');
  }));

  it('should behave the same with urls', inject(function() {
    var element = compile('<input type="url" ng-model="url" ng-model-cookie="" />')(scope);
    scope.url = 'http://google.com';

    scope.$digest();
    expect(scope.url).toBe('http://google.com');
    expect(element.val()).toBe('http://google.com');

    cookies.put('url', 'http://yahoo.com');
    scope.$digest();
    expect(scope.url).toBe('http://yahoo.com');
    expect(element.val()).toBe('http://yahoo.com');

    element.val('http://bing.com');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.url).toBe('http://bing.com');
    expect(cookies.get('url')).toBe('http://bing.com');
  }));

  it('should behave the same with select', inject(function() {
    var element = compile(' \
      <select ng-model="select" ng-model-cookie=""> \
        <option value="a">A</option> \
        <option value="b">B</option> \
      </select> \
    ')(scope);
    scope.select = 'a';

    scope.$digest();
    expect(scope.select).toBe('a');
    expect(element.val()).toBe('a');

    cookies.put('select', 'b');
    scope.$digest();
    expect(scope.select).toBe('b');
    expect(element.val()).toBe('b');

    element.val('a');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.select).toBe('a');
    expect(cookies.get('select')).toBe('a');
  }));

  it('should behave the same with textarea', inject(function() {
    var element = compile('<textarea ng-model="textarea" ng-model-cookie=""></textarea>')(scope);
    scope.textarea = 'a';

    scope.$digest();
    expect(scope.textarea).toBe('a');
    expect(element.val()).toBe('a');

    cookies.put('textarea', 'b');
    scope.$digest();
    expect(scope.textarea).toBe('b');
    expect(element.val()).toBe('b');

    element.val('a');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.textarea).toBe('a');
    expect(cookies.get('textarea')).toBe('a');
  }));

  it('should allow custom cookie name', inject(function() {
    var element = compile('<input ng-model="input" ng-model-cookie="search" />')(scope);
    scope.input = 'abc';

    scope.$digest();
    expect(scope.input).toBe('abc');
    expect(element.val()).toBe('abc');

    cookies.put('input', '123');
    scope.$digest();
    expect(scope.input).toBe('abc');
    expect(element.val()).toBe('abc');

    cookies.put('search', '123');
    scope.$digest();
    expect(scope.input).toBe('123');
    expect(element.val()).toBe('123');

    element.val('abc');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.input).toBe('abc');
    expect(cookies.get('input')).toBe('123');
    expect(cookies.get('search')).toBe('abc');
  }));
});
