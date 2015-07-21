# Extends ngModel &nbsp; [![Build Status Image](https://travis-ci.org/Plippe/extends-ng-model.svg)](https://travis-ci.org/Plippe/extends-ng-model)

## Overview

Based on [angular's documentation](https://docs.angularjs.org/api/ng/directive/ngModel)
> The `ngModel` directive binds an `input`, `select`, `textarea` (or custom form control) to a property on the scope using [NgModelController](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController), which is created and exposed by this directive.

This project extends this functionality by binding controls to properties that are not in the scope.


## Getting started

1. Download the library using one of the three terminal commands bellow:
  - `$ bower install git://github.com/plippe/extends-ng-model.git --save`
  - `$ npm install git://github.com/plippe/extends-ng-model.git --save`
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
    <script src="bower_components/extends-ng-model/dist/extends-ng-model.min.js"></script>
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

## ngModelLocation

This directive is in charge of data binding between an `ngModel` and a parameter in the [query string](https://en.wikipedia.org/wiki/Query_string). By implementing this directive, your users should be able to bookmark and share URLs.

The following example will synchronise `filter.name`, the `ng-model` and the query string argument. When the user types or when the url changes, the other will update itself.

```html
<label for="title">Title</label>
<input name="title" ng-model="filter.name" ng-model-location="" />
```

This works for [all input types defined by Angular](https://docs.angularjs.org/api/ng/input) as well as `select` and `textarea` ([see examples](https://github.com/Plippe/extends-ng-model/blob/master/example/ng-model-location.html)).

**Warning:** `ngModelLocation` requires the `ngModel` directive to work
