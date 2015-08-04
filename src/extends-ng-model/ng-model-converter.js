angular.module('extendsNgModel').provider('ngModelConverter', function() {
  this.$get = function($filter) {
    var dateFilter = $filter('date'),
      converter = {
        'checkbox': function(value) { return value === true || value === 'true'; },
        'date': function(value) { return dateFilter(value, 'yyyy-MM-dd') },
        'month': function(value) { return dateFilter(value, 'yyyy-MM') },
        'week': function(value) { return dateFilter(value, 'yyyy-Www') },
        'time': function(value) { return dateFilter(value, 'HH:mm:ss') },
        'datetime-local': function(value) { return dateFilter(value, 'yyyy-MM-ddTHH:mm:ss') }
      };



    return function(value, inputType) {
      return inputType in converter ?
        converter[inputType](value) :
        value;
    };
  };
});
