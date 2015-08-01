'use strict'

var rk4 = require('../lib')

var dydt = function(dydt, y, t) {
  dydt[0] = -y[1]
  dydt[1] =  y[0]
}

var y0 = [1,0]
var n = 1000
var t0 = 0
var dt = 2.0 * Math.PI / n

var integrator = rk4( y0, dydt, t0, dt )

// Integrate 1000 steps:
integrator.steps(n)

// Integrate all the way around a circle:
// => integrator.y = [ 0.9999999999995743, -8.160481752145232e-11 ]

