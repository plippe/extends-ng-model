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
