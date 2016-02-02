"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Easing = require('../Easing');

var Easing = _interopRequireWildcard(_Easing);

var Ease = (function () {
  _createClass(Ease, null, [{
    key: "DEFAULT_OPTIONS",
    value: {
      tolerance: 0.001,
      easingFunction: Easing.easeOutQuad
    },
    enumerable: true
  }, {
    key: "Type",
    value: "Ease",
    enumerable: true
  }]);

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
      // t: current time, b: begInnIng value, c: change In value, d: duration
      this._time += delta;
      this._x = this._options.easingFunction(this._time, 0, 1, 1);
      return this._x;
    }
  }, {
    key: "isFinished",
    value: function isFinished() {
      return this._time >= 1;
    }
  }], [{
    key: "getValue",
    value: function getValue(options) {
      return options.easingFunction(options.time, 0, 1, 1);
    }
  }]);

  return Ease;
})();

exports["default"] = Ease;
module.exports = exports["default"];