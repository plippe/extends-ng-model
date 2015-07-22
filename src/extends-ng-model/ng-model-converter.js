angular.module('extendsNgModel').factory('ngModelConverter', function($filter) {
  var dateFilter = $filter('date'),
    convert = function(ngValue, inputType) {
      switch(inputType.toLowerCase()) {
        case 'checkbox':
          return ngValue === true || ngValue === 'true';
        case 'date':
          return dateFilter(ngValue, 'yyyy-MM-dd');
        case 'month':
          return dateFilter(ngValue, 'yyyy-MM');
        case 'week':
          return dateFilter(ngValue, 'yyyy-Www');
        case 'time':
          return dateFilter(ngValue, 'HH:mm:ss');
        case 'datetime-local':
          return dateFilter(ngValue, 'yyyy-MM-ddTHH:mm:ss');
        default :
          return ngValue;
      }
    }

  return convert;
});
