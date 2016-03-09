'use strict';

describe('Service: riot', function () {

  // load the service's module
  beforeEach(module('riotangularApp'));

  // instantiate service
  var riot;
  beforeEach(inject(function (_riot_) {
    riot = _riot_;
  }));

  it('should do something', function () {
    expect(!!riot).toBe(true);
  });

});
