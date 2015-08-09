describe('ngModelConverter', function(){

  beforeEach(module('extendsNgModel'));

  var converterProvider;
  beforeEach(function(){
    module(function(ngModelConverterProvider){
      converterProvider = ngModelConverterProvider;
    });
  });

  var converter;
  beforeEach(inject(function($injector){
    converter = $injector.get('ngModelConverter');
  }));

  var converters = ['fromStorage', 'toStorage'];
  converters.map(function(fromTo){
    it('should not change text inputs', inject(function() {
      var value = converter[fromTo]('should not change', { type: 'text' });
      expect(value).toBe('should not change');
    }));

    it('should not change email inputs', inject(function() {
      var value = converter[fromTo]('ab@cd.ef', { type: 'email' });
      expect(value).toBe('ab@cd.ef');
    }));

    it('should not change radio inputs', inject(function() {
      var value = converter[fromTo]('should not change', { type: 'radio' });
      expect(value).toBe('should not change');
    }));

    it('should not change url inputs', inject(function() {
      var value = converter[fromTo]('http://google.com', { type: 'url' });
      expect(value).toBe('http://google.com');
    }));

    it('should not change selects', inject(function() {
      var value = converter[fromTo]('should not change', { type: 'select' });
      expect(value).toBe('should not change');
    }));

    it('should not change text areas', inject(function() {
      var value = converter[fromTo]('should not change', { type: 'textarea' });
      expect(value).toBe('should not change');
    }));

    it('should not use custom converter if doesn\'t match', inject(function() {
      var addFromTo = "push" + fromTo.charAt(0).toUpperCase() + fromTo.slice(1) + "Converter";
      converterProvider[addFromTo](function() { return false; }, function(value) { return 'AAA'; });
      var value = converter[fromTo]('123', {});
      expect(value).toBe('123');
    }));

    it('should use custom converter if match', inject(function() {
      var addFromTo = "push" + fromTo.charAt(0).toUpperCase() + fromTo.slice(1) + "Converter";
      converterProvider[addFromTo](function() { return true; }, function(value) { return 'AAA'; });
      var value = converter[fromTo]('123', {});
      expect(value).toBe('AAA');
    }));

    it('should use custom converter over default one', inject(function() {
      var addFromTo = "push" + fromTo.charAt(0).toUpperCase() + fromTo.slice(1) + "Converter";
      converterProvider[addFromTo](
        function(attr) { return attr.type === 'date'; },
        function(value) { return 'AAA'; });;
      var value = converter[fromTo](new Date(2001, 2, 3, 4, 5, 6), { type: 'date' });
      expect(value).toBe('AAA');
    }));

    it('should use first custom converter found', inject(function() {
      var addFromTo = "push" + fromTo.charAt(0).toUpperCase() + fromTo.slice(1) + "Converter";
      converterProvider[addFromTo](function() { return true; }, function(value) { return 'AAA'; });
      converterProvider[addFromTo](function() { return true; }, function(value) { return 'BBB'; });
      var value = converter[fromTo]('123', {});
      expect(value).toBe('AAA');
    }));
  });

  it('should not change number inputs for storage', inject(function() {
    var value = converter.toStorage(123, { type: 'number' });
    expect(value).toBe(123);
  }));

  it('should not change checkboxes for storage', inject(function() {
    expect(converter.toStorage(true, { type: 'checkbox' }, true)).toBe(true);
    expect(converter.toStorage(false, { type: 'checkbox' }, false)).toBe(false);
    expect(converter.toStorage('anything', { type: 'checkbox' })).toBe('anything');
  }));

  it('should change date inputs to be yyyy-MM-ddTHH:mm:ss for storage', inject(function() {
    var value = converter.toStorage(new Date(2001, 2, 3, 4, 5, 6), { type: 'date' });
    expect(value).toBe('2001-03-03T04:05:06');
  }));

  it('should change month inputs to be yyyy-MM-ddTHH:mm:ss for storage', inject(function() {
    var value = converter.toStorage(new Date(2001, 2, 3, 4, 5, 6), { type: 'month' });
    expect(value).toBe('2001-03-03T04:05:06');
  }));

  it('should change week inputs to be yyyy-MM-ddTHH:mm:ss for storage', inject(function() {
    var value = converter.toStorage(new Date(2001, 2, 3, 4, 5, 6), { type: 'week' });
    expect(value).toBe('2001-03-03T04:05:06');
  }));

  it('should change time inputs to be yyyy-MM-ddTHH:mm:ss for storage', inject(function() {
    var value = converter.toStorage(new Date(2001, 2, 3, 4, 5, 6), { type: 'time' });
    expect(value).toBe('2001-03-03T04:05:06');
  }));

  it('should change date time inputs to be yyyy-MM-ddTHH:mm:ss for storage', inject(function() {
    var value = converter.toStorage(new Date(2001, 2, 3, 4, 5, 6), { type: 'datetime-local' });
    expect(value).toBe('2001-03-03T04:05:06');
  }));

  it('should change number inputs to be floats for model', inject(function() {
    expect(converter.fromStorage(123, { type: 'number' })).toBe(123);
    expect(converter.fromStorage(123.4, { type: 'number' })).toBe(123.4);
    expect(converter.fromStorage('123', { type: 'number' })).toBe(123);
    expect(converter.fromStorage('123.4', { type: 'number' })).toBe(123.4);
  }));

  it('should change checkboxes to be booleans for model', inject(function() {
    expect(converter.fromStorage(true, { type: 'checkbox' }, true)).toBe(true);
    expect(converter.fromStorage('true', { type: 'checkbox' }, true)).toBe(true);
    expect(converter.fromStorage(false, { type: 'checkbox' }, false)).toBe(false);
    expect(converter.fromStorage('false', { type: 'checkbox' }, false)).toBe(false);
    expect(converter.fromStorage('anything', { type: 'checkbox' })).toBe(false);
  }));

  it('should change date inputs to be yyyy-MM-ddTHH:mm:ss for model', inject(function() {
    var value = converter.fromStorage('2001-03-03T04:05:06', { type: 'date' });
    expect(value).toEqual(new Date(2001, 2, 3, 4, 5, 6));
  }));

  it('should change month inputs to be yyyy-MM-ddTHH:mm:ss for model', inject(function() {
    var value = converter.fromStorage('2001-03-03T04:05:06', { type: 'month' });
    expect(value).toEqual(new Date(2001, 2, 3, 4, 5, 6));
  }));

  it('should change week inputs to be yyyy-MM-ddTHH:mm:ss for model', inject(function() {
    var value = converter.fromStorage('2001-03-03T04:05:06', { type: 'week' });
    expect(value).toEqual(new Date(2001, 2, 3, 4, 5, 6));
  }));

  it('should change time inputs to be yyyy-MM-ddTHH:mm:ss for model', inject(function() {
    var value = converter.fromStorage('2001-03-03T04:05:06', { type: 'time' });
    expect(value).toEqual(new Date(2001, 2, 3, 4, 5, 6));
  }));

  it('should change date time inputs to be yyyy-MM-ddTHH:mm:ss for model', inject(function() {
    var value = converter.fromStorage('2001-03-03T04:05:06', { type: 'datetime-local' });
    expect(value).toEqual(new Date(2001, 2, 3, 4, 5, 6));
  }));

});
