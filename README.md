# Extends ngModel &nbsp; [![Build Status Image](https://api.travis-ci.org/Plippe/extends-ng-model.svg?branch=master)](https://travis-ci.org/Plippe/extends-ng-model)  [![Coverage Status Image](https://coveralls.io/repos/Plippe/extends-ng-model/badge.svg?branch=master&service=github)](https://coveralls.io/github/Plippe/extends-ng-model?branch=master)

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

## ngModelLocation

This directive is in charge of data binding between an `ngModel` and a parameter in the [query string](https://en.wikipedia.org/wiki/Query_string). By implementing this directive, your users should be able to bookmark and share URLs.

The following example will synchronise `filter.name`, the `ng-model` and the query string argument. When the user types or when the url changes, the other will update itself.

```html
<label for="title">Title</label>
<input name="title" ng-model="filter.name" ng-model-location="" />
```

This works for [all input types defined by Angular](https://docs.angularjs.org/api/ng/input) as well as `select` and `textarea` ([see examples](https://github.com/Plippe/extends-ng-model/blob/master/example/ng-model-location.html)).

If you prefer a query string name different to the `ngModel` name, set the desired value in the `ngModelLocation` argument like the example bellow.

```html
<label for="title">Title</label>
<input name="title"
  ng-model="accessibleInScope"
  ng-model-location="accessibleInLocation" />
```

**Warning:** `ngModelLocation` requires the `ngModel` directive to work


## ngModelCache

This directive is in charge of data binding between an `ngModel` and a parameter in the [cache](https://docs.angularjs.org/api/ng/type/$cacheFactory.Cache). By implementing this directive, you could easily implement multi step forms.

The following example will synchronise `form.name`, the `ng-model` and the cache argument. When the user types or when the cache changes, the other will update itself.

```html
<label for="title">Name</label>
<input name="title" ng-model="form.name" ng-model-cache="" />
```

This works for [all input types defined by Angular](https://docs.angularjs.org/api/ng/input) as well as `select` and `textarea` ([see examples](https://github.com/Plippe/extends-ng-model/blob/master/example/ng-model-cache.html)).

If you prefer a cache name different to the `ngModel` name, set the desired value in the `ngModelCache` argument like the example bellow.

```html
<label for="title">Title</label>
<input name="title"
  ng-model="accessibleInScope"
  ng-model-cache="accessibleInLocation" />
```

**Warning:** `ngModelCache` requires the `ngModel` directive to work


## ngModelCookie

This directive is in charge of data binding between an `ngModel` and a [cookie](https://docs.angularjs.org/api/ngCookies/service/$cookies). By implementing this directive, you save user input over multiple sessions.

The following example will synchronise `form.pageSize`, the `ng-model` and the cookie. When the user types or when the cookie changes, the other will update itself.

```html
<label for="title">Name</label>
<input name="title" ng-model="form.pageSize" ng-model-cookie="" />
```

This works for [all input types defined by Angular](https://docs.angularjs.org/api/ng/input) as well as `select` and `textarea` ([see examples](https://github.com/Plippe/extends-ng-model/blob/master/example/ng-model-cookie.html)).

If you prefer a cookie name different to the `ngModel` name, set the desired value in the `ngModelCookie` argument like the example bellow.

```html
<label for="title">Title</label>
<input name="title"
  ng-model="accessibleInScope"
  ng-model-cookie="accessibleInLocation" />
```

**Warning:**
  - `ngModelCookie` requires the `ngCookies` module to work
  - `ngModelCookie` requires the `ngModel` directive to work
