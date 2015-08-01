'use strict'

module.exports = IntegratorFactory

var Integrator = function Integrator( y0, deriv, t, dt ) {
  // Bind variables to this:
  this.deriv = deriv
  this.y = y0
  this.n = this.y.length
  this.dt = dt
  this.t = t

  // Create a scratch array into which we compute the derivative:
  this._ctor = this.y.constructor

  this._w = new this._ctor( this.n )
  this._k1 = new this._ctor( this.n )
  this._k2 = new this._ctor( this.n )
  this._k3 = new this._ctor( this.n )
  this._k4 = new this._ctor( this.n )
}

Integrator.prototype.step = function() {

  this.deriv( this._k1, this.y, this.t )

  for(var i=0; i<this.n; i++) {
    this._w[i] = this.y[i] + this._k1[i] * this.dt * 0.5
  }

  this.deriv( this._k2, this._w, this.t + this.dt * 0.5 )

  for(var i=0; i<this.n; i++) {
    this._w[i] = this.y[i] + this._k2[i] * this.dt * 0.5
  }

  this.deriv( this._k3, this._w, this.t + this.dt * 0.5 )

  for(var i=0; i<this.n; i++) {
    this._w[i] = this.y[i] + this._k3[i] * this.dt
  }

  this.deriv( this._k4, this._w, this.t + this.dt)


  var dto6 = this.dt / 6.0
  for(var i=0; i<this.n; i++) {
    this.y[i] += dto6 * ( this._k1[i] + 2*this._k2[i] + 2*this._k3[i] + this._k4[i] )
  }

  this.t += this.dt
  return this
}

Integrator.prototype.steps = function( n ) {
  for(var step=0; step<n; step++) {
    this.step()
  }
  return this
}

function IntegratorFactory( y0, deriv, t, dt ) {
  return new Integrator( y0, deriv, t, dt )
}

