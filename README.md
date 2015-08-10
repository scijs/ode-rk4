# ode-rk4 [![Build Status](https://travis-ci.org/scijs/ode-rk4.svg)](https://travis-ci.org/scijs/ode-rk4) [![npm version](https://badge.fury.io/js/ode-rk4.svg)](http://badge.fury.io/js/ode-rk4) [![Dependency Status](https://david-dm.org/scijs/ode-rk4.svg)](https://david-dm.org/scijs/ode-rk4)

> Integrate a system of ODEs using the Fourth Order Runge-Kutta (RK-4) method


## Introduction

This module integrates a system of ordinary differential equations of the form

<p align="center"><img alt="&bsol;begin&lcub;eqnarray&midast;&rcub; y&apos;&lpar;t&rpar; &amp;&equals;&amp; f&lpar;t&comma; y&lpar;t&rpar;&rpar;&comma; &bsol;&bsol; y&lpar;t&lowbar;0&rpar; &amp;&equals;&amp; y&lowbar;0 &bsol;end&lcub;eqnarray&midast;&rcub;" valign="middle" src="docs/images/begineqnarray-yt-ft-yt-yt_0-y_0-endeqnarray-0298eae3db.png" width="187" height="61"></p>

where <img alt="y" valign="middle" src="docs/images/y-720f311276.png" width="14.5" height="20"> is a vector of length <img alt="n" valign="middle" src="docs/images/n-9baedbc330.png" width="16" height="16">. Given time step <img alt="&bsol;Delta t" valign="middle" src="docs/images/delta-t-a20a5fe4f2.png" width="28" height="16">, the Runge-Kutta 4 method integrates the ODE with update

<p align="center"><img alt="&bsol;begin&lcub;eqnarray&midast;&rcub; y&lowbar;&lcub;n&plus;1&rcub; &amp;&equals;&amp; &bsol;frac&lcub;&bsol;Delta t&rcub;&lcub;6&rcub;&bsol;left&lpar;k&lowbar;1 &plus; 2k&lowbar;2 &plus; 2k&lowbar;3 &plus; k&lowbar;4&bsol;right&rpar; &bsol;&bsol; t&lowbar;&lcub;n&plus;1&rcub; &amp;&equals;&amp; t&lowbar;n &plus; &bsol;Delta t &bsol;end&lcub;eqnarray&midast;&rcub;" valign="middle" src="docs/images/begineqnarray-y_n1-fracdelta-t6leftk_1-2k_2-2-41157480a7.png" width="321.5" height="71"></p>
where <img alt="k&lowbar;n" valign="middle" src="docs/images/k_n-d413726dee.png" width="25.5" height="19"> are given by
<p align="center"><img alt="&bsol;begin&lcub;eqnarray&midast;&rcub; k&lowbar;1 &amp;&equals;&amp; f&lpar;t&lowbar;n&comma; y&lowbar;n&rpar;&comma; &bsol;&bsol; k&lowbar;2 &amp;&equals;&amp; f&lpar;t&lowbar;n &plus; &bsol;frac&lcub;&bsol;Delta t&rcub;&lcub;2&rcub;&comma; y&lowbar;n &plus; &bsol;frac&lcub;&bsol;Delta t&rcub;&lcub;2&rcub; k&lowbar;1&rpar;&comma; &bsol;&bsol; k&lowbar;3 &amp;&equals;&amp; f&lpar;t&lowbar;n &plus; &bsol;frac&lcub;&bsol;Delta t&rcub;&lcub;2&rcub;&comma; y&lowbar;n &plus; &bsol;frac&lcub;&bsol;Delta t&rcub;&lcub;2&rcub; k&lowbar;2&rpar;&comma; &bsol;&bsol; k&lowbar;4 &amp;&equals;&amp; f&lpar;t&lowbar;n &plus; &bsol;Delta t&comma; y&lowbar;n &plus; &bsol;Delta tk&lowbar;3&rpar;&period;  &bsol;end&lcub;eqnarray&midast;&rcub;" valign="middle" src="docs/images/begineqnarray-k_1-ft_n-y_n-k_2-ft_n-fracdelta-35d808c6ef.png" width="288" height="156.5"></p>

For a similar adaptive method using the fifth order Cash-Karp Runge-Kutta method with fourth order embedded error estimator, see [https://github.com/scijs/ode45-cash-karp](ode45-cash-karp].

## Install

```bash
$ npm install ode-rk4
```

## Example

```javascript
var rk4 = require('ode-rk4')

var deriv = function(dydt, y, t) {
  dydt[0] = -y[1]
  dydt[1] =  y[0]
}

var y0 = [1,0]
var n = 1000
var t0 = 0
var dt = 2.0 * Math.PI / n

var integrator = rk4( y0, deriv, t0, dt )

// Integrate 1000 steps:
integrator.steps(n)

// Integrate all the way around a circle:
// => integrator.y = [ 0.9999999999995743, -8.160481752145232e-11 ]
```



## API

### `require('ode-rk4')( y0, deriv, t0, dt )`
**Arguments:**
- `y0`: an array or typed array containing initial conditions. This vector is updated in-place with each integrator step.
- `deriv`: a function that calculates the derivative. Format is `function( dydt, y, t )`. Inputs are current state `y` and current time `t`, output is the calculated derivative `dydt`.
- `t0`: initial time <img alt="t" valign="middle" src="docs/images/t-fc93da6f4d.png" width="11.5" height="16">.
- `dt`: time step <img alt="&bsol;Delta t" valign="middle" src="docs/images/delta-t-a20a5fe4f2.png" width="28" height="16">.

**Returns**:
Initialized integrator object.

**Properties:**
- `n`: dimension of `y0`.
- `y`: current state. Initialized as a shallow copy of input `y0`.
- `deriv`: function that calculates the derivative. Initialized from input. May be changed.
- `t`: current time, incremented by `dt` with each time step.
- `dt`: time step <img alt="&bsol;Delta t" valign="middle" src="docs/images/delta-t-a20a5fe4f2.png" width="28" height="16">. Initialized from input `dt`. May be changed.

**Methods:**
- `.step()`: takes a single step of the RK-4 integrator and stores the result in-place in the `y` property.
- `.steps( n )`: takes `n` steps of the RK-4 integrator, storing the result in-place in the `y` property.

## Credits

(c) 2015 Ricky Reusser. MIT License