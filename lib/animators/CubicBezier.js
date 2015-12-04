"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CubicBezier = (function () {
  _createClass(CubicBezier, null, [{
    key: "DEFAULT_OPTIONS",
    value: {
      tolerance: 0.001,
      controlPoints: [.15, .66, .83, .67]
    },
    enumerable: true
  }, {
    key: "Type",
    value: "CubicBezier",
    enumerable: true
  }]);

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
      // t: current time, b: begInnIng value, c: change In value, d: duration
      this._time += delta;
      this._x = this._getPointOnBezierCurve(this._options.controlPoints, this._time);
      return this._x;
    }
  }, {
    key: "_getPointOnBezierCurve",
    value: function _getPointOnBezierCurve(controlPoints, l) {
      var a1 = { x: 0, y: 0 };
      var a2 = { x: 1, y: 1 };

      var c1 = { x: controlPoints[0], y: controlPoints[1] };
      var c2 = { x: controlPoints[2], y: controlPoints[3] };

      var b1 = this._interpolate(a1, c1, l);
      var b2 = this._interpolate(c1, c2, l);
      var b3 = this._interpolate(c2, a2, l);

      c1 = this._interpolate(b1, b2, l);
      c2 = this._interpolate(b2, b3, l);

      return this._interpolate(c1, c2, l).y;
    }
  }, {
    key: "_interpolate",
    value: function _interpolate(p1, p2, l) {
      var p3 = {};

      p3.x = p1.x + (p2.x - p1.x) * l;
      p3.y = p1.y + (p2.y - p1.y) * l;

      return p3;
    }
  }, {
    key: "isFinished",
    value: function isFinished() {
      return this._time >= 1;
    }
  }]);

  return CubicBezier;
})();

exports["default"] = CubicBezier;
module.exports = exports["default"];