"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Utils = require("./Utils");

var _Utils2 = _interopRequireDefault(_Utils);

var _Easing = require('./Easing');

var Easing = _interopRequireWildcard(_Easing);

var _animatorsEase = require("./animators/ease");

var _animatorsEase2 = _interopRequireDefault(_animatorsEase);

var _animatorsFriction = require("./animators/friction");

var _animatorsFriction2 = _interopRequireDefault(_animatorsFriction);

var _animatorsSpring = require("./animators/spring");

var _animatorsSpring2 = _interopRequireDefault(_animatorsSpring);

var _animatorsSpringRK4 = require("./animators/springRK4");

var _animatorsSpringRK42 = _interopRequireDefault(_animatorsSpringRK4);

var MotionTween = (function () {
  _createClass(MotionTween, null, [{
    key: "DEFAULT_OPTIONS",
    value: {
      time: 1000,
      startValue: 0,
      endValue: 1,
      animatorType: _animatorsFriction2["default"].Type,
      animatorOptions: null, // use defaults of selected type
      update: function update() {},
      complete: function complete() {}
    },
    enumerable: true
  }, {
    key: "easingFunction",
    value: {
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
    },
    enumerable: true
  }, {
    key: "animatorType",
    value: {
      spring: _animatorsSpring2["default"].Type,
      springRK4: _animatorsSpringRK42["default"].Type,
      friction: _animatorsFriction2["default"].Type,
      ease: _animatorsEase2["default"].Type
    },
    enumerable: true
  }]);

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
      _Utils2["default"].extend(this._options, MotionTween.DEFAULT_OPTIONS, true);
      _Utils2["default"].extend(this._options, options, true);

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

      switch (this._options.animatorType) {
        case _animatorsSpring2["default"].Type:
          this._animator = new _animatorsSpring2["default"](this._options.animatorOptions);
          break;
        case _animatorsSpringRK42["default"].Type:
          this._animator = new _animatorsSpringRK42["default"](this._options.animatorOptions);
          break;
        case _animatorsFriction2["default"].Type:
          this._animator = new _animatorsFriction2["default"](this._options.animatorOptions);
          break;
        default:
          this._animator = new _animatorsEase2["default"](this._options.animatorOptions);
      }

      // this._animator = new Spring({stiffness: 100, damping: 20, tolerance: 0.01});
      this._isAnimating = true;
      this._startTime = this._lastTime = new Date().getTime();
      //this._tick();
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
      var normalisedAnimatedX = this._animator.step(delta);

      if (this._animator.isFinished() === false) {
        this._x = this._startX + (this._endX - this._startX) * normalisedAnimatedX;
        // console.log(`x=${this._x} normalisedAnimatedX=${normalisedAnimatedX} delta=${delta}`);
        this._options.update(this._x);
        this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
      } else {
        this._x = this._endX;
        this._options.update(this._x);
        this._options.complete();
        this._isAnimating = false;
      }
    }
  }]);

  return MotionTween;
})();

exports["default"] = MotionTween;
module.exports = exports["default"];