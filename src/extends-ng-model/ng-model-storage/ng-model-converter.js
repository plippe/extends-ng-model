angular.module('extendsNgModel').provider('ngModelConverter', function() {
  var customFromConverter = [],
    customToConverter = [],
    addConverter = function(customConverter) {
      return function(match, convert) {
        customConverter.push({match: match, convert: convert });
      }
    };

  this.pushFromStorageConverter = addConverter(customFromConverter);
  this.pushToStorageConverter = addConverter(customToConverter);

  this.$get = function($filter) {
    var ifInputType = function(inputTypesToMatch) {
      switch(true) {
        case (angular.isString(inputTypesToMatch)):
          inputTypesToMatch = [inputTypesToMatch];
          break
        case (angular.isArray(inputTypesToMatch)):
          break
        default:
          inputTypesToMatch = [];
      }

      return function(inputAttributes) {
        var inputType = inputAttributes.type || 'text';
        return inputTypesToMatch.indexOf(inputType.toLowerCase()) !== -1;
      }
    },
      dateFilter = $filter('date'),
      dateInputs = ['date', 'month', 'week', 'time', 'datetime-local'],
      defaultFromConverter = [
        { match: ifInputType('number'), convert: function(value) { return parseFloat(value); }},
        { match: ifInputType('checkbox'), convert: function(value) { return value === true || value === "true"; }},
        { match: ifInputType(dateInputs), convert: function(value) { return new Date(value); }}
      ],
      defaultToConverter = [
        { match: ifInputType(dateInputs), convert: function(value) {
          return dateFilter(value, 'yyyy-MM-ddTHH:mm:ss'); }}
      ],
      convert = function(value, attributes, converters) {
        for(i in converters) {
          var converter = converters[i];
          if(converter.match(attributes)) {
            return converter.convert(value);
          }
        }

        return value;
      };

    return {
      fromStorage: function(value, attributes) {
        return convert(value, attributes, customFromConverter.concat(defaultFromConverter))
      },
      toStorage: function(value, attributes) {
        return convert(value, attributes, customToConverter.concat(defaultToConverter))
      }
    }
  };
});
