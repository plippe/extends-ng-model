# Extends ngModel &nbsp; [![Build Status Image](https://api.travis-ci.org/Plippe/extends-ng-model.svg?branch=master)](https://travis-ci.org/Plippe/extends-ng-model)  [![Coverage Status Image](https://coveralls.io/repos/Plippe/extends-ng-model/badge.svg?branch=master&service=github)](https://coveralls.io/github/Plippe/extends-ng-model?branch=master)

## Overview

Based on [angular's documentation](https://docs.angularjs.org/api/ng/directive/ngModel)
> The `ngModel` directive binds an `input`, `select`, `textarea` (or custom form control) to a property on the scope using [NgModelController](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController), which is created and exposed by this directive.

This project builds on top of this to add new features for `ngModel`.


## Getting started

1. Download the library using one of the three terminal commands bellow:
  - `$ bower install extends-ng-model --save`
  - `$ npm install extends-ng-model --save`
  - `$ git clone git@github.com:Plippe/extends-ng-model.git`
2. Load `angular.min.js`
3. Load `extends-ng-model.min.js`
4. Add `extendsNgModel` to your module's dependencies.

Your html should look similar to the following

```html
<!doctype html>
<html ng-app="myApp">
<head>
  ...
</head>
<body>
    ...
    <!-- Load Angular -->
    <script src="bower_components/angular/angular.min.js"></script>
    <!-- Load Extends ngModel -->
    <script src="bower_components/extends-ng-model/dist/extends-ng-model.min.js">
    </script>
    ...
    <script>
        var myApp = angular.module('myApp', [
          ...
          // Add Extends ngModel to your module's dependencies
          'extendsNgModel',
          ...
        ]);
    </script>
    ...
</body>
</html>
```

## Storage

Angular binds input with variables making it easy to access a form's values, but not all values should be limited to a scope or a reduced life time. The following directives synchronize `ngModel` and angular's built in store to add functionality.


### ngModelCache

Having pages broken down into small, reusable, and testable directives is something to aim for, but the scope can make this difficult. `ngModelCache` synchronize `ngModel` and angular's [`$cache`](https://docs.angularjs.org/api/ng/type/$cacheFactory.Cache). The cache is volatile, but is accessible across multiple scopes.

The following example will save the user's name in the `$cache`. If the `$cache` or the `input` changes, the other will update itself.

```html
<label for="firstName">First Name</label>
<input name="firstName" ng-model="form.firstName" ng-model-cache="" />
```

A custom cache name can be supplied like in the example bellow.

```html
<label for="firstName">First Name</label>
<input name="firstName" ng-model="form.firstName" ng-model-cache="firstName" />
```


### ngModelCookie

User's don't like inputting the same information multiple times especially if it can be saved over multiple sessions. `ngModelCookie` synchronize `ngModel` and angular's [`$cookies`](https://docs.angularjs.org/api/ngCookies/service/$cookies). Cookies are non-volatile making them perfect for short term to medium term options.

The following example will save the page's size in a `$cookie`. If the `$cookie` or the `input` changes, the other will update itself.

```html
<label for="pageSize">Page Size</label>
<input name="pageSize" ng-model="form.pageSize" ng-model-cookie="" />
```

A custom cookie name can be supplied like in the example bellow.

```html
<label for="pageSize">Page Size</label>
<input name="pageSize" ng-model="form.pageSize" ng-model-cookie="pageSize" />

**Warning:** `ngModelCookie` requires the `ngCookies` module to work


### ngModelLocation

Being able to save or share a URL makes it more likely that the current user and new ones will come visit the application. `ngModelLocation` synchronize `ngModel` and angular's [`$location.search`](https://docs.angularjs.org/api/ng/service/$location). The URL works wonders for searches and filter, as the information isn't private and other links rarely require a form.

The following example will save the search query in the URL. If the URL or the `input` changes, the other will update itself.

```html
<label for="search">Search</label>
<input name="search" ng-model="form.q" ng-model-location="" />
```

A custom query string name can be supplied like in the example bellow.

```html
<label for="search">Search</label>
<input name="search" ng-model="form.q" ng-model-location="q" />
```


### Custom Storage Read / Write

Directives that read and write to storage have a default converter that provide basic functionality. If you require something more specific feel free to add your own custom converters.

Custom converters are wired up during the configuration phase. There are two lists of converters, one is called when writing from the model to the storage (`pushToStorageConverter`), while the other does the opposite (`pushFromStorageConverter`). These take two functions as arguments. The first one takes the element's attribute and should return true if you wish the converter to be applied to this element. The second function takes the value and returns the updated value.

The following example will store `ngModelLocation` numbers as hexadecimal values in the query string over the default decimal format.

```js
angular
  .module("myApp", ['extendsNgModel'])
  .config(function(ngModelConverterProvider) {
    var isNumber = function(attr) { return attr.type === 'number'; },
      toHex = function(modelValue) { return modelValue.toString(16); },
      fromHex = function(storageValue) { return parseInt(storageValue, 16); };

    ngModelConverterProvider.pushToStorageConverter(isNumber, toHex);
    ngModelConverterProvider.pushFromStorageConverter(isNumber, fromHex);
  });
```

**Warning:** Only the first positive converter is applied


For more examples please see the [appropriate folder](https://github.com/Plippe/extends-ng-model/tree/master/example/ng-model-storage).


## Formatters / Parsers

Angular's `ngModel` has two main pieces, a variable to hold the value, and an input to display and alter it. `ngModelController`, obtain by requiring `ngModel` in a directive, offers ways the alter the variable based on the input with [`$parsers`](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController#$parsers) and the input based on the variable with [`$formatters`](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController#$formatters).

The following use `$parsers` and `$formatters` to convert the input data into a more useful type.


### ngModelTimestamp

A JavaScript date object is represented as a string when sent to the back end. Converting this string back to a date isn't always straight forward. `ngModelTimestamp` converts date inputs on the UI to time stamps in the application. Furthermore, it is compatible with the previously explained storage directives.

The following example will make the date of birth accessible as an time stamp and not a date.

```html
<label for="dob">Date of Birth</label>
<input name="dob" type="date"
  ng-model="form.dob"
  ng-model-timestamp="" />
```

The input can be store in the query string, as a time stamp, like in the example bellow.

```html
<label for="dob">Date of Birth</label>
<input name="dob" type="date"
  ng-model="form.dob"
  ng-model-location=""
  ng-model-timestamp="" />
```
