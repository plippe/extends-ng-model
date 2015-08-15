angular.module('extendsNgModel').provider('ngModelConverter', function() {
  var customFromConverters = [],
    customToConverters = [],
    addConverter = function(customConverters) {
      return function(match, convert) {
        customConverters.push({match: match, convert: convert });
      }
    };

  this.pushFromStorageConverter = addConverter(customFromConverters);
  this.pushToStorageConverter = addConverter(customToConverters);

  this.$get = function($filter) {
    var arrayOfString = function(arg) {
      switch(true) {
        case (angular.isString(arg)): return [arg];
        case (angular.isArray(arg)): return arg;
        default: return [];
      } },
      ifInputType = function(inputTypesToMatch) {
        inputTypesToMatch = arrayOfString(inputTypesToMatch);
        return function(inputAttributes) {
          var inputType = inputAttributes.type || 'text';
          return inputTypesToMatch.indexOf(inputType.toLowerCase()) !== -1;
        } },
      hasAttribute = function(attributeNamesToMatch) {
        attributeNamesToMatch = arrayOfString(attributeNamesToMatch);
        return function(inputAttributes) {
          return attributeNamesToMatch
            .map(function(attributeName) { return angular.isDefined(inputAttributes[attributeName]); })
            .reduce(function(a, b) { return a && b });
        } },
      dateFilter = $filter('date'),
      dateInputs = ['date', 'month', 'week', 'time', 'datetime-local'],
      defaultFromConverters = [
        { match: ifInputType('number'), convert: function(value) { return parseFloat(value); }},
        { match: ifInputType('checkbox'),
          convert: function(value) { return value === true || value === "true"; }},
        { match: ifInputType(dateInputs) && hasAttribute('ngModelTimestamp'),
          convert: function(value) { return parseInt(value); }},
        { match: ifInputType(dateInputs),
          convert: function(value) { return new Date(value); }}
      ],
      defaultToConverters = [
        { match: ifInputType(dateInputs) && hasAttribute('ngModelTimestamp'),
          convert: function(value) { return value; }},
        { match: ifInputType(dateInputs),
          convert: function(value) { return dateFilter(value, 'yyyy-MM-ddTHH:mm:ss'); }}
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
        return convert(value, attributes, customFromConverters.concat(defaultFromConverters))
      },
      toStorage: function(value, attributes) {
        return convert(value, attributes, customToConverters.concat(defaultToConverters))
      }
    }
  };
});
