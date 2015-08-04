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
      var value = converter[fromTo](undefined, 'text', 'should not change');
      expect(value).toBe('should not change');
    }));

    it('should not change number inputs', inject(function() {
      var value = converter[fromTo](undefined, 'number', 123);
      expect(value).toBe(123);
    }));

    it('should not change email inputs', inject(function() {
      var value = converter[fromTo](undefined, 'email', 'ab@cd.ef');
      expect(value).toBe('ab@cd.ef');
    }));

    it('should not change radio inputs', inject(function() {
      var value = converter[fromTo](undefined, 'radio', 'should not change');
      expect(value).toBe('should not change');
    }));

    it('should not change url inputs', inject(function() {
      var value = converter[fromTo](undefined, 'url', 'http://google.com');
      expect(value).toBe('http://google.com');
    }));

    it('should not change text inputs', inject(function() {
      var value = converter[fromTo](undefined, 'text', 'should not change');
      expect(value).toBe('should not change');
    }));

    it('should not change selects', inject(function() {
      var value = converter[fromTo](undefined, 'select', 'should not change');
      expect(value).toBe('should not change');
    }));

    it('should not change text areas', inject(function() {
      var value = converter[fromTo](undefined, 'textarea', 'should not change');
      expect(value).toBe('should not change');
    }));

    it('should change checkbox inputs to be boolean', inject(function() {
      expect(converter[fromTo](undefined, 'checkbox', 'true')).toBe(true);
      expect(converter[fromTo](undefined, 'checkbox', true)).toBe(true);
      expect(converter[fromTo](undefined, 'checkbox', 'false')).toBe(false);
      expect(converter[fromTo](undefined, 'checkbox', false)).toBe(false);
      expect(converter[fromTo](undefined, 'checkbox', 'anything')).toBe(false);
    }));

    it('should change date inputs to be yyyy-MM-dd', inject(function() {
      var value = converter[fromTo](undefined, 'date', new Date(2001, 2, 3, 4, 5, 6));
      expect(value).toBe('2001-03-03');
    }));

    it('should change month inputs to be yyyy-MM', inject(function() {
      var value = converter[fromTo](undefined, 'month', new Date(2001, 2, 3, 4, 5, 6));
      expect(value).toBe('2001-03');
    }));

    it('should change week inputs to be yyyy-Www', inject(function() {
      var value = converter[fromTo](undefined, 'week', new Date(2001, 2, 3, 4, 5, 6));
      expect(value).toBe('2001-W09');
    }));

    it('should change time inputs to be HH:mm', inject(function() {
      var value = converter[fromTo](undefined, 'time', new Date(2001, 2, 3, 4, 5, 6));
      expect(value).toBe('04:05:06');
    }));

    it('should change date time inputs to be yyyy-MM-ddTHH:mm', inject(function() {
      var value = converter[fromTo](undefined, 'datetime-local', new Date(2001, 2, 3, 4, 5, 6));
      expect(value).toBe('2001-03-03T04:05:06');
    }));

    it('should use custom converter if given', inject(function() {
      var addFromTo = "add" + fromTo.charAt(0).toUpperCase() + fromTo.slice(1) + "Converter";
      converterProvider[addFromTo]('ngModelCache', 'text', function(value) { return 'AAA'; });
      var value = converter[fromTo]('ngModelCache', 'text', '123');
      expect(value).toBe('AAA');
    }));

    it('should use custom converter over default one if given', inject(function() {
      var addFromTo = "add" + fromTo.charAt(0).toUpperCase() + fromTo.slice(1) + "Converter";
      converterProvider[addFromTo]('ngModelCache', 'date', function(value) { return 'AAA'; });
      var value = converter[fromTo]('ngModelCache', 'date', new Date(2001, 2, 3, 4, 5, 6));
      expect(value).toBe('AAA');
    }));

    it('should use custom converter from appropriete storage if given', inject(function() {
      var addFromTo = "add" + fromTo.charAt(0).toUpperCase() + fromTo.slice(1) + "Converter";
      converterProvider[addFromTo]('ngModelCache', 'text', function(value) { return 'AAA'; });
      converterProvider[addFromTo]('ngModelCookie', 'text', function(value) { return 'BBB'; });
      var value = converter[fromTo]('ngModelCookie', 'text', '123');
      expect(value).toBe('BBB');
    }));
  });

});
