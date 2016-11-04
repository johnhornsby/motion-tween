"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Easing = require("../Easing");

var Easing = _interopRequireWildcard(_Easing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ease = function () {
  function Ease(options) {
    _classCallCheck(this, Ease);

    // merge default with passed
    this._options = _extends({}, Ease.DEFAULT_OPTIONS, options);

    this._x = 0;
    this._time = 0;
  }

  _createClass(Ease, [{
    key: "step",
    value: function step(delta) {
      this._time += delta;
      if (this._time >= this._options.duration) {
        this._x = 1;
      } else {
        // t: current time, b: begInnIng value, c: change In value, d: duration
        this._x = this._options.easingFunction(this._time, 0, 1, this._options.duration);
      }
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
      return options.easingFunction(time, 0, 1, 1);
    }
  }]);

  return Ease;
}();

Ease.DEFAULT_OPTIONS = {
  tolerance: 0.001,
  easingFunction: Easing.easeOutQuad,
  destination: 1,
  duration: 1,
  origin: 0
};
Ease.Type = "ease";
exports.default = Ease;