// r4k from http://mtdevans.com/2013/05/fourth-order-runge-kutta-algorithm-in-javascript-with-demo/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpringRK4 = (function () {
  _createClass(SpringRK4, null, [{
    key: "DEFAULT_OPTIONS",
    value: {
      stiffness: 100,
      damping: 20,
      tolerance: 0.001
    },
    enumerable: true
  }, {
    key: "Type",
    value: "SPRINGRK4",
    enumerable: true
  }]);

  function SpringRK4(options) {
    _classCallCheck(this, SpringRK4);

    // merge default with passed
    this._options = _extends({}, SpringRK4.DEFAULT_OPTIONS, options);

    // set position to 1 as we are wanting the result normalised
    this._state = {
      x: 1,
      v: 0
    };
  }

  _createClass(SpringRK4, [{
    key: "_rk4",
    value: function _rk4(state, a, dt) {
      var x = state.x;
      var v = state.v;
      // Returns final (position, velocity) array after time dt has passed.
      //        x: initial position
      //        v: initial velocity
      //        a: acceleration function a(x,v,dt) (must be callable)
      //        dt: timestep
      var x1 = x;
      var v1 = v;
      var a1 = a(x1, v1, 0);

      var x2 = x + 0.5 * v1 * dt;
      var v2 = v + 0.5 * a1 * dt;
      var a2 = a(x2, v2, dt / 2);

      var x3 = x + 0.5 * v2 * dt;
      var v3 = v + 0.5 * a2 * dt;
      var a3 = a(x3, v3, dt / 2);

      var x4 = x + v3 * dt;
      var v4 = v + a3 * dt;
      var a4 = a(x4, v4, dt);

      var xf = x + dt / 6 * (v1 + 2 * v2 + 2 * v3 + v4);
      var vf = v + dt / 6 * (a1 + 2 * a2 + 2 * a3 + a4);

      return {
        x: xf,
        v: vf
      };
    }
  }, {
    key: "_acceleration",
    value: function _acceleration(x, v, dt) {
      // This particular one models a spring with a 1kg mass
      return -this._options.stiffness * x - this._options.damping * v;
    }
  }, {
    key: "step",
    value: function step(delta) {
      this._state = this._rk4(this._state, this._acceleration.bind(this), delta);
      // the calculation gives values starting from 1 and then finishing at 0,
      // we need to transform the values to work from 0 to 1.
      return (this._state.x - 1) * -1;
    }
  }, {
    key: "isFinished",
    value: function isFinished() {
      return Math.round(this._state.v / this._options.tolerance) === 0 && Math.round(this._state.x / this._options.tolerance) === 0 ? true : false;
    }
  }]);

  return SpringRK4;
})();

exports["default"] = SpringRK4;
module.exports = exports["default"];