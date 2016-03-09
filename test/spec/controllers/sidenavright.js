'use strict';

describe('Controller: SidenavrightCtrl', function () {

  // load the controller's module
  beforeEach(module('riotangularApp'));

  var SidenavrightCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidenavrightCtrl = $controller('SidenavrightCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SidenavrightCtrl.awesomeThings.length).toBe(3);
  });
});
