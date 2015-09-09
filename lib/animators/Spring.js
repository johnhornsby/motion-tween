"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spring = (function () {
  _createClass(Spring, null, [{
    key: "DEFAULT_OPTIONS",
    value: {
      stiffness: 100,
      damping: 20,
      tolerance: 0.001
    },
    enumerable: true
  }, {
    key: "Type",
    value: "SPRING",
    enumerable: true
  }]);

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

      return this._x;
    }
  }, {
    key: "isFinished",
    value: function isFinished() {
      return Math.round(this._v / this._options.tolerance) === 0 && Math.round(this._x / this._options.tolerance) === 1 / this._options.tolerance ? true : false;
    }
  }]);

  return Spring;
})();

exports["default"] = Spring;
module.exports = exports["default"];