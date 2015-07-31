'use strict'

var rk4 = require('../lib')
  , assert = require('chai').assert
  , richardson = require('richardson-extrapolation')

var ctors = {
  'float32': Float32Array,
  'float64': Float64Array,
  'array': function(){ return Array.apply(this,arguments[0]) }
}


Object.keys(ctors).forEach(function(dtype) {
  var ctor = ctors[dtype]

  describe('rk4 integration (' + dtype + ')', function() {

    describe('taking time steps', function() {
      var integrator, f, y0, t0

      beforeEach(function() {
        f = function(dydt, y) {
          dydt[0] = -y[1]
          dydt[1] =  y[0]
        }

        t0 = 1.5
        y0 = new ctor([1,0])

        integrator = rk4( y0, f, t0, 1 )
      })

      it("takes a single timestep",function() {
        integrator.step()
        assert.closeTo( integrator.y[0], 0.5416666666666667, 1e-4 )
        assert.closeTo( integrator.y[1], 0.8333333333333333, 1e-4 )
      })

      it("increments the time",function() {
        integrator.step()
        assert.closeTo( integrator.t, t0 + integrator.dt, 1e-4 )
        integrator.step()
        assert.closeTo( integrator.t, t0 + 2*integrator.dt, 1e-4 )
      })

      it("takes multiple timesteps",function() {
        integrator.steps(2)
        assert.closeTo(integrator.y[0], -0.4010416666666664, 1e-4 )
        assert.closeTo(integrator.y[1], 0.9027777777777778, 1e-4)
      })
    })

    describe('convergence', function() {
      it('total accumulated error is order O(h^4)', function() {

        var result = richardson(function(h) {

          // Integrate around a circle with this step size:
          var f = function(dydt, y) { dydt[0] = -y[1]; dydt[1] =  y[0] }
          var i = rk4( new ctor([1,0]), f, 0, h )
          i.steps( Math.floor(2*Math.PI/h + 0.5) )

          // Return the distance from the expected endpoint:
          return Math.sqrt( Math.pow(i.y[0]-1,2) + Math.pow(i.y[1],2) )

        }, 2*Math.PI/20, { f: 0 } )

        assert.closeTo( result.n, 4, 1e-2, 'total accumulated error is O(h^4)' )
      })
    })

  })

})
