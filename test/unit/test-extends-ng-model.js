describe('HelloCtrl', function(){

  beforeEach(module('extendsNgModel'));

  it('should have a working testable project', inject(function($controller) {
    var scope = {},
      ctrl = $controller('HelloCtrl', {$scope:scope});

    expect(scope.hello).toBe("world");
  }));

});
