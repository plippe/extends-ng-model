describe('ngModelConverter', function(){

  beforeEach(module('extendsNgModel'));

  var converter;
  beforeEach(inject(function($injector){
    converter = $injector.get('ngModelConverter');
  }));

  it('should not change text inputs', inject(function() {
    var value = converter('should not change', 'text');
    expect(value).toBe('should not change');
  }));

  it('should not change number inputs', inject(function() {
    var value = converter(123, 'number');
    expect(value).toBe(123);
  }));

  it('should not change email inputs', inject(function() {
    var value = converter('ab@cd.ef', 'email');
    expect(value).toBe('ab@cd.ef');
  }));

  it('should not change radio inputs', inject(function() {
    var value = converter('should not change', 'radio');
    expect(value).toBe('should not change');
  }));

  it('should not change url inputs', inject(function() {
    var value = converter('http://google.com', 'url');
    expect(value).toBe('http://google.com');
  }));

  it('should not change text inputs', inject(function() {
    var value = converter('should not change', 'text');
    expect(value).toBe('should not change');
  }));

  it('should not change selects', inject(function() {
    var value = converter('should not change', 'select');
    expect(value).toBe('should not change');
  }));

  it('should not change text areas', inject(function() {
    var value = converter('should not change', 'textarea');
    expect(value).toBe('should not change');
  }));

  it('should change checkbox inputs to be boolean', inject(function() {
    expect(converter('true', 'checkbox')).toBe(true);
    expect(converter(true, 'checkbox')).toBe(true);
    expect(converter('false', 'checkbox')).toBe(false);
    expect(converter(false, 'checkbox')).toBe(false);
    expect(converter('anything', 'checkbox')).toBe(false);
  }));

  it('should change date inputs to be yyyy-MM-dd', inject(function() {
    var value = converter(new Date(2001, 2, 3, 4, 5, 6), 'date');
    expect(value).toBe('2001-03-03');
  }));

  it('should change month inputs to be yyyy-MM', inject(function() {
    var value = converter(new Date(2001, 2, 3, 4, 5, 6), 'month');
    expect(value).toBe('2001-03');
  }));

  it('should change week inputs to be yyyy-Www', inject(function() {
    var value = converter(new Date(2001, 2, 3, 4, 5, 6), 'week');
    expect(value).toBe('2001-W09');
  }));

  it('should change time inputs to be HH:mm', inject(function() {
    var value = converter(new Date(2001, 2, 3, 4, 5, 6), 'time');
    expect(value).toBe('04:05:06');
  }));

  it('should change date time inputs to be yyyy-MM-ddTHH:mm', inject(function() {
    var value = converter(new Date(2001, 2, 3, 4, 5, 6), 'datetime-local');
    expect(value).toBe('2001-03-03T04:05:06');
  }));

});
