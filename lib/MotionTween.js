"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require("./Utils");

var _Utils2 = _interopRequireDefault(_Utils);

var _Easing = require("./Easing");

var Easing = _interopRequireWildcard(_Easing);

var _CubicBezier = require("./animators/CubicBezier");

var _CubicBezier2 = _interopRequireDefault(_CubicBezier);

var _Ease = require("./animators/Ease");

var _Ease2 = _interopRequireDefault(_Ease);

var _Friction = require("./animators/Friction");

var _Friction2 = _interopRequireDefault(_Friction);

var _Spring = require("./animators/Spring");

var _Spring2 = _interopRequireDefault(_Spring);

var _SpringRK = require("./animators/SpringRK4");

var _SpringRK2 = _interopRequireDefault(_SpringRK);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MotionTween = function () {
  function MotionTween(options) {
    _classCallCheck(this, MotionTween);

    this._time = null;
    this._startX = null;
    this._endX = null;
    this._lastTime = null;
    this._startTime = null;
    this._options = {};
    this._isAnimating = false;
    this._animator = null;
    this._x = null;

    this._init(options);
    return this;
  }

  _createClass(MotionTween, [{
    key: "start",
    value: function start() {
      this._start();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroy();
    }
  }, {
    key: "_init",
    value: function _init(options) {
      // Deep merge of default and incoming options
      _Utils2.default.extend(this._options, MotionTween.DEFAULT_OPTIONS, true);
      _Utils2.default.extend(this._options, options, true);

      // time we can ignore for some of the animators
      this._time = this._options.time;
      this._startX = this._options.startValue;
      this._endX = this._options.endValue;
    }
  }, {
    key: "_start",
    value: function _start() {
      this._lastTime = 0;
      this._startTime = 0;

      this._options.animatorOptions.destination = this._endX;
      this._options.animatorOptions.origin = this._startX;

      switch (this._options.animatorType) {
        case _Spring2.default.Type:
          this._animator = new _Spring2.default(this._options.animatorOptions);
          break;
        case _SpringRK2.default.Type:
          this._animator = new _SpringRK2.default(this._options.animatorOptions);
          break;
        case _Friction2.default.Type:
          this._animator = new _Friction2.default(this._options.animatorOptions);
          break;
        case _CubicBezier2.default.Type:
          this._animator = new _CubicBezier2.default(this._options.animatorOptions);
          break;
        default:
          this._animator = new _Ease2.default(this._options.animatorOptions);
      }

      this._isAnimating = true;
      this._startTime = this._lastTime = new Date().getTime();

      this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      window.cancelAnimationFrame(this._requestionAnimationFrameID);
      this._options = null;
    }
  }, {
    key: "_tick",
    value: function _tick() {
      var now = new Date().getTime();

      var delta = (now - this._lastTime) / this._time;
      this._lastTime = now;

      // pass in normalised delta
      var x = this._animator.step(delta);

      if (this._animator.isFinished() === false) {

        this._x = x;

        this._options.update(this._x);
        this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
      } else {
        this._x = this._endX;
        this._options.update(this._x);
        this._options.complete();
        this._isAnimating = false;
      }
    }
  }], [{
    key: "getValue",
    value: function getValue(animatorType, animatorOptions, time) {
      return MotionTween._getValue(animatorType, animatorOptions, time);
    }
  }, {
    key: "_getValue",
    value: function _getValue(animatorType, animatorOptions, time) {
      switch (animatorType) {
        case _CubicBezier2.default.Type:
          return _CubicBezier2.default.getValue(animatorOptions, time);
          break;
        default:
          return _Ease2.default.getValue(animatorOptions, time);
      }
    }
  }]);

  return MotionTween;
}();

MotionTween.DEFAULT_OPTIONS = {
  time: 1000,
  startValue: 0,
  endValue: 1,
  animatorType: _Friction2.default.Type,
  animatorOptions: {}, // use defaults of selected type
  update: function update() {},
  complete: function complete() {}
};
MotionTween.easingFunction = {
  easeInQuad: Easing.easeInQuad,
  easeOutQuad: Easing.easeOutQuad,
  easeInOutQuad: Easing.easeInOutQuad,
  swing: Easing.swing,
  easeInCubic: Easing.easeInCubic,
  easeOutCubic: Easing.easeOutCubic,
  easeInOutCubic: Easing.easeInOutCubic,
  easeInQuart: Easing.easeInQuart,
  easeOutQuart: Easing.easeOutQuart,
  easeInOutQuart: Easing.easeInOutQuart,
  easeInQuint: Easing.easeInQuint,
  easeOutQuint: Easing.easeOutQuint,
  easeInOutQuint: Easing.easeInOutQuint,
  easeInSine: Easing.easeInSine,
  easeOutSine: Easing.easeOutSine,
  easeInOutSine: Easing.easeInOutSine,
  easeInExpo: Easing.easeInExpo,
  easeOutExpo: Easing.easeOutExpo,
  easeInOutExpo: Easing.easeInOutExpo,
  easeInCirc: Easing.easeInCirc,
  easeOutCirc: Easing.easeOutCirc,
  easeInOutCirc: Easing.easeInOutCirc,
  easeInElastic: Easing.easeInElastic,
  easeOutElastic: Easing.easeOutElastic,
  easeInOutElastic: Easing.easeInOutElastic,
  easeInBack: Easing.easeInBack,
  easeOutBack: Easing.easeOutBack,
  easeInOutBack: Easing.easeInOutBack,
  easeInBounce: Easing.easeInBounce,
  easeOutBounce: Easing.easeOutBounce,
  easeInOutBounce: Easing.easeInOutBounce
};
MotionTween.animatorType = {
  spring: _Spring2.default.Type,
  springRK4: _SpringRK2.default.Type,
  friction: _Friction2.default.Type,
  ease: _Ease2.default.Type,
  cubicBezier: _CubicBezier2.default.Type
};
exports.default = MotionTween;