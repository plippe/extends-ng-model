angular.module('extendsNgModel').provider('ngModelConverter', function() {
  var customConverter = {};
  this.addConverter = function(inputType, f) { customConverter[inputType] = f; }

  this.$get = function($filter) {
    var dateFilter = $filter('date'),
      defaultConverter = {
        'checkbox': function(value) { return value === true || value === 'true'; },
        'date': function(value) { return dateFilter(value, 'yyyy-MM-dd') },
        'month': function(value) { return dateFilter(value, 'yyyy-MM') },
        'week': function(value) { return dateFilter(value, 'yyyy-Www') },
        'time': function(value) { return dateFilter(value, 'HH:mm:ss') },
        'datetime-local': function(value) { return dateFilter(value, 'yyyy-MM-ddTHH:mm:ss') }
      };

    return function(value, inputType) {
      switch (true) {
        case (inputType in customConverter): return customConverter[inputType](value);
        case (inputType in defaultConverter): return defaultConverter[inputType](value);
        default: return value;
      }
    };
  };
});
