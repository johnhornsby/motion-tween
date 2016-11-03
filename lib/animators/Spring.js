"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spring = function () {
  function Spring(options) {
    _classCallCheck(this, Spring);

    // merge default with passed
    this._options = _extends({}, Spring.DEFAULT_OPTIONS, options);

    this._v = 0;
    this._x = 0;
  }

  _createClass(Spring, [{
    key: "step",
    value: function step(delta) {
      var k = 0 - this._options.stiffness;
      var b = 0 - this._options.damping;

      var F_spring = k * (this._x - 1);
      var F_damper = b * this._v;

      var mass = 1;

      this._v += (F_spring + F_damper) / mass * delta;
      this._x += this._v * delta;

      // remember x goes from 0 - 1
      return this._options.origin + this._x * (this._options.destination - this._options.origin);
    }
  }, {
    key: "isFinished",
    value: function isFinished() {
      // round v
      var velocity = Math.round(this._v / this._options.tolerance);
      // recalculate x
      var x = this._options.origin + this._x * (this._options.destination - this._options.origin);
      // round it
      var roundedX = Math.round(x / this._options.tolerance) * this._options.tolerance;

      return velocity === 0 && roundedX === this._options.destination ? true : false;
    }
  }]);

  return Spring;
}();

Spring.DEFAULT_OPTIONS = {
  stiffness: 100,
  damping: 20,
  tolerance: 0.001,
  destination: 1
};
Spring.Type = "SPRING";
exports.default = Spring;