"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Friction = (function () {
  _createClass(Friction, null, [{
    key: "DEFAULT_OPTIONS",
    value: {
      applyAcceleration: function applyAcceleration(accel) {
        return accel;
      },
      friction: 0.1,
      destination: 1,
      tolerance: 0.001
    },
    enumerable: true
  }, {
    key: "Type",
    value: "FRICTION",
    enumerable: true
  }]);

  function Friction(options) {
    _classCallCheck(this, Friction);

    // merge default with passed
    this._options = _extends({}, Friction.DEFAULT_OPTIONS, options);
    this._v = 0;
    this._x = 0;
    this._acceleration = (this._options.destination - this._x) * this._options.friction;
    this._previousX = 0;
  }

  _createClass(Friction, [{
    key: "step",
    value: function step(delta) {
      // delta is ignored in the FrictionAnimator
      this._acceleration = this._options.applyAcceleration(this._acceleration);

      this._v += this._acceleration;
      this._x += this._v;
      this._v *= 1 - this._options.friction;

      // reset the acceleration as this is set initially
      this._acceleration = 0;
      this._previousX = this._x;

      return this._x;
    }
  }, {
    key: "isFinished",
    value: function isFinished() {
      return Math.round(this._v / this._options.tolerance) === 0 && Math.round(this._x / this._options.tolerance) === this._options.destination / this._options.tolerance ? true : false;
    }
  }]);

  return Friction;
})();

exports["default"] = Friction;
module.exports = exports["default"];