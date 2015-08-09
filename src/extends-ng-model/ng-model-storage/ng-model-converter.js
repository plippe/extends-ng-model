angular.module('extendsNgModel').provider('ngModelConverter', function() {
  var customFromConverter = {},
    customToConverter = {},
    addConverter = function(customConverter) {
      return function(storageName, inputType, f) {
        if(!(storageName in customConverter)) { customConverter[storageName] = {}; }
        customConverter[storageName][inputType] = f;
      }
    };

  this.addFromStorageConverter = addConverter(customFromConverter);
  this.addToStorageConverter = addConverter(customToConverter);

  this.$get = function($filter) {
    var dateFilter = $filter('date'),
      defaultConverter = {
        'checkbox': function(value) { return value === true || value === 'true'; },
        'date': function(value) { return dateFilter(value, 'yyyy-MM-dd') },
        'month': function(value) { return dateFilter(value, 'yyyy-MM') },
        'week': function(value) { return dateFilter(value, 'yyyy-Www') },
        'time': function(value) { return dateFilter(value, 'HH:mm:ss') },
        'datetime-local': function(value) { return dateFilter(value, 'yyyy-MM-ddTHH:mm:ss') }
      },
      convert = function(customConverter) {
        return function(storageName, inputType, value) {
          switch (true) {
            case (storageName in customConverter && inputType in customConverter[storageName]):
              return customConverter[storageName][inputType](value);
            case (inputType in defaultConverter):
              return defaultConverter[inputType](value);
            default:
              return value;
          }
        }
      };

    return {
      fromStorage: convert(customFromConverter),
      toStorage: convert(customToConverter)
    }
  };
});
