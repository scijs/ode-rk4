# ode-rk4 [![Build Status](https://travis-ci.org/scijs/ode-rk4.svg)](https://travis-ci.org/scijs/ode-rk4) [![npm version](https://badge.fury.io/js/ode-rk4.svg)](http://badge.fury.io/js/ode-rk4) [![Dependency Status](https://david-dm.org/scijs/ode-rk4.svg)](https://david-dm.org/scijs/ode-rk4)

> Integrate a system of ODEs using the Fourth Order Runge-Kutta (RK-4) method


## Introduction

This module integrates a system of ordinary differential equations of the form <p align="center"><img alt="undefined" valign="middle" src="images/yt-ft-yt-fae25965d3.png" width="151.5" height="25"></p> <p align="center"><img alt="undefined" valign="middle" src="images/yt_0-y_0-42d14f447f.png" width="91.5" height="24"></p> where <img alt="undefined" valign="middle" src="images/y-adb83ba1d7.png" width="14.5" height="16.5"> is a vector of length <img alt="undefined" valign="middle" src="images/n-66e1b1ee17.png" width="16" height="13">. Given time step <img alt="undefined" valign="middle" src="images/delta-t-9813ae7971.png" width="28" height="18">, the Runge-Kutta 4 method integrates the ODE with update <p align="center"><img alt="undefined" valign="middle" src="images/y_n1-fracdelta-t6leftk_1-2k_2-2k_3-k_4right-58f49ef625.png" width="289" height="45"></p> <p align="center"><img alt="undefined" valign="middle" src="images/t_n1-t_n-delta-t-a6feda606a.png" width="135" height="22.5"></p> where <img alt="undefined" valign="middle" src="images/k_n-bcd1333065.png" width="25.5" height="21"> are given by <p align="center"><img alt="undefined" valign="middle" src="images/k_1-ft_n-y_n-9aa4e00ef0.png" width="130.5" height="24"></p> <p align="center"><img alt="undefined" valign="middle" src="images/k_2-ft_n-fracdelta-t2-y_n-fracdelta-t2-k_1-d1c9d16d54.png" width="255.5" height="45"></p> <p align="center"><img alt="undefined" valign="middle" src="images/k_3-ft_n-fracdelta-t2-y_n-fracdelta-t2-k_2-605f389527.png" width="255.5" height="45"></p> <p align="center"><img alt="undefined" valign="middle" src="images/k_4-ft_n-delta-t-y_n-delta-tk_3-8ee3750675.png" width="246" height="24"></p>

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
// => integrator.y = [ 1.0199349143076457, -0.00008432969374211775 ]
```



## API

### `require('ode-rk4')( y0, deriv, t0, dt )`
**Arguments:**
- `y0`: an array or typed array containing initial conditions. This vector is updated in-place with each integrator step.
- `deriv`: a function that calculates the derivative. Format is `function( dydt, y, t )`. Inputs are current state `y` and current time `t`, output is calcualted derivative `dydt`.
- `t0`: initial time <img alt="undefined" valign="middle" src="images/t-3f19307093.png" width="11.5" height="16.5">.
- `dt`: time step <img alt="undefined" valign="middle" src="images/delta-t-9813ae7971.png" width="28" height="18">.

**Returns**:
Initialized integrator object.

**Properties:**
- `n`: dimension of `y0`.
- `y`: current state. Initialized as a shallow copy of input `y0`.
- `deriv`: function that calcualtes derivative. Initialized from input. May be changed.
- `t`: current time, incremented by `dt` with each time step.
- `dt`: time step <img alt="undefined" valign="middle" src="images/delta-t-9813ae7971.png" width="28" height="18">. Initialized from input `dt`. May be changed.

**Methods:**
- `.step()`: takes a single step of the RK-4 integrator and stores the result in-place in the `y` property.
- `.steps( n )`: takes `n` steps of the RK-4 integrator, storing the result in-place in the `y` property.

## Credits

(c) 2015 Ricky Reusser. MIT License