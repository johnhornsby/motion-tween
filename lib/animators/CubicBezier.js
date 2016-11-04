"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CubicBezier = function () {
  function CubicBezier(options) {
    _classCallCheck(this, CubicBezier);

    // merge default with passed
    this._options = _extends({}, CubicBezier.DEFAULT_OPTIONS, options);

    this._x = 0;
    this._time = 0;
  }

  _createClass(CubicBezier, [{
    key: "step",
    value: function step(delta) {
      this._time += delta;

      var position = this._time / this._options.duration;

      this._x = CubicBezier._getPointOnBezierCurve(this._options.controlPoints, position);
      return this._options.origin + this._x * (this._options.destination - this._options.origin);
    }
  }, {
    key: "isFinished",
    value: function isFinished() {
      return this._time >= this._options.duration;
    }
  }], [{
    key: "getValue",
    value: function getValue(options, time) {
      return CubicBezier._getPointOnBezierCurve(options.controlPoints, time);
    }
  }, {
    key: "_getPointOnBezierCurve",
    value: function _getPointOnBezierCurve(controlPoints, l) {
      var a1 = { x: 0, y: 0 };
      var a2 = { x: 1, y: 1 };

      var c1 = { x: controlPoints[0], y: controlPoints[1] };
      var c2 = { x: controlPoints[2], y: controlPoints[3] };

      var b1 = CubicBezier._interpolate(a1, c1, l);
      var b2 = CubicBezier._interpolate(c1, c2, l);
      var b3 = CubicBezier._interpolate(c2, a2, l);

      c1 = CubicBezier._interpolate(b1, b2, l);
      c2 = CubicBezier._interpolate(b2, b3, l);

      return CubicBezier._interpolate(c1, c2, l).y;
    }
  }, {
    key: "_interpolate",
    value: function _interpolate(p1, p2, l) {
      var p3 = {};

      p3.x = p1.x + (p2.x - p1.x) * l;
      p3.y = p1.y + (p2.y - p1.y) * l;

      return p3;
    }
  }]);

  return CubicBezier;
}();

CubicBezier.DEFAULT_OPTIONS = {
  tolerance: 0.001,
  controlPoints: [.15, .66, .83, .67],
  duration: 1,
  destination: 1,
  origin: 0
};
CubicBezier.Type = "cubicBezier";
exports.default = CubicBezier;