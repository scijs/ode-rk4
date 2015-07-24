'use strict';

var rk4 = require('../lib');
var assert = require('chai').assert;

describe("rk4 integration", function() {

  var integrator, f, y0;

  beforeEach(function() {
    f = function(dydt, y) {
      dydt[0] = -y[1];
      dydt[1] =  y[0];
    };

    y0 = new Float64Array([1,0]);

    integrator = rk4( y0, f, 0, 1 );
  });

  it("takes a single timestep",function() {
    integrator.step();
    assert.closeTo( integrator.y[0], 0.5416666666666667, 1e-4 );
    assert.closeTo( integrator.y[1], 0.8333333333333333, 1e-4 );
    assert.closeTo( integrator.t, 1, 1e-4 )
  });

  it("takes multiple timesteps",function() {
    integrator.steps(2);
    assert.closeTo(integrator.y[0], -0.4010416666666664, 1e-4 );
    assert.closeTo(integrator.y[1], 0.9027777777777778, 1e-4);
    assert.closeTo( integrator.t, 2, 1e-4 )
  });

});
