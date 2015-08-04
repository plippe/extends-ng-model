describe('ngModelConverter', function(){

  beforeEach(module('extendsNgModel'));

  var converterProvider;
  beforeEach(function(){
    module(function(ngModelConverterProvider){
      converterProvider=ngModelConverterProvider;
    });
  });

  var converter;
  beforeEach(inject(function($injector){
    converter = $injector.get('ngModelConverter');
  }));

  it('should not change text inputs', inject(function() {
    var value = converter(undefined, 'text', 'should not change');
    expect(value).toBe('should not change');
  }));

  it('should not change number inputs', inject(function() {
    var value = converter(undefined, 'number', 123);
    expect(value).toBe(123);
  }));

  it('should not change email inputs', inject(function() {
    var value = converter(undefined, 'email', 'ab@cd.ef');
    expect(value).toBe('ab@cd.ef');
  }));

  it('should not change radio inputs', inject(function() {
    var value = converter(undefined, 'radio', 'should not change');
    expect(value).toBe('should not change');
  }));

  it('should not change url inputs', inject(function() {
    var value = converter(undefined, 'url', 'http://google.com');
    expect(value).toBe('http://google.com');
  }));

  it('should not change text inputs', inject(function() {
    var value = converter(undefined, 'text', 'should not change');
    expect(value).toBe('should not change');
  }));

  it('should not change selects', inject(function() {
    var value = converter(undefined, 'select', 'should not change');
    expect(value).toBe('should not change');
  }));

  it('should not change text areas', inject(function() {
    var value = converter(undefined, 'textarea', 'should not change');
    expect(value).toBe('should not change');
  }));

  it('should change checkbox inputs to be boolean', inject(function() {
    expect(converter(undefined, 'checkbox', 'true')).toBe(true);
    expect(converter(undefined, 'checkbox', true)).toBe(true);
    expect(converter(undefined, 'checkbox', 'false')).toBe(false);
    expect(converter(undefined, 'checkbox', false)).toBe(false);
    expect(converter(undefined, 'checkbox', 'anything')).toBe(false);
  }));

  it('should change date inputs to be yyyy-MM-dd', inject(function() {
    var value = converter(undefined, 'date', new Date(2001, 2, 3, 4, 5, 6));
    expect(value).toBe('2001-03-03');
  }));

  it('should change month inputs to be yyyy-MM', inject(function() {
    var value = converter(undefined, 'month', new Date(2001, 2, 3, 4, 5, 6));
    expect(value).toBe('2001-03');
  }));

  it('should change week inputs to be yyyy-Www', inject(function() {
    var value = converter(undefined, 'week', new Date(2001, 2, 3, 4, 5, 6));
    expect(value).toBe('2001-W09');
  }));

  it('should change time inputs to be HH:mm', inject(function() {
    var value = converter(undefined, 'time', new Date(2001, 2, 3, 4, 5, 6));
    expect(value).toBe('04:05:06');
  }));

  it('should change date time inputs to be yyyy-MM-ddTHH:mm', inject(function() {
    var value = converter(undefined, 'datetime-local', new Date(2001, 2, 3, 4, 5, 6));
    expect(value).toBe('2001-03-03T04:05:06');
  }));

  it('should use custom converter if given', inject(function() {
    converterProvider.addConverter('ngModelCache', 'text', function(value) { return 'AAA'; });
    var value = converter('ngModelCache', 'text', '123');
    expect(value).toBe('AAA');
  }));

  it('should use custom converter over default one if given', inject(function() {
    converterProvider.addConverter('ngModelCache', 'date', function(value) { return 'AAA'; });
    var value = converter('ngModelCache', 'date', new Date(2001, 2, 3, 4, 5, 6));
    expect(value).toBe('AAA');
  }));

  it('should use custom converter from appropriete storage if given', inject(function() {
    converterProvider.addConverter('ngModelCache', 'text', function(value) { return 'AAA'; });
    converterProvider.addConverter('ngModelCookie', 'text', function(value) { return 'BBB'; });
    var value = converter('ngModelCookie', 'text', '123');
    expect(value).toBe('BBB');
  }));

});
