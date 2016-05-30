(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(2);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Easing = __webpack_require__(3);

	var Easing = _interopRequireWildcard(_Easing);

	var _CubicBezier = __webpack_require__(4);

	var _CubicBezier2 = _interopRequireDefault(_CubicBezier);

	var _Ease = __webpack_require__(5);

	var _Ease2 = _interopRequireDefault(_Ease);

	var _Friction = __webpack_require__(6);

	var _Friction2 = _interopRequireDefault(_Friction);

	var _Spring = __webpack_require__(7);

	var _Spring2 = _interopRequireDefault(_Spring);

	var _SpringRK = __webpack_require__(8);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }

	    _createClass(Utils, [{
	        key: 'extend',
	        value: function extend(destination, source) {
	            var isDeep = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            var hasDepth = false;
	            for (var property in source) {
	                hasDepth = false;
	                if (isDeep === true && source[property] && source[property].constructor) {
	                    if (source[property].constructor === Object) {
	                        hasDepth = true;
	                        destination[property] = this.extend({}, source[property], true);
	                    } else if (source[property].constructor === Function) {
	                        // if (window.console) console.warn("Can't clone, can only reference Functions");
	                        hasDepth = false;
	                    }
	                }
	                if (hasDepth === false) {
	                    destination[property] = source[property];
	                }
	            }
	            return destination;
	        }
	    }, {
	        key: 'sum',
	        value: function sum(arr) {
	            var sum = 0;
	            var d = arr.length;
	            while (d--) {
	                sum += arr[d];
	            }
	            return sum;
	        }
	    }]);

	    return Utils;
	}();

	exports.default = new Utils();


	(function () {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame) {
	        window.requestAnimationFrame = function (callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function () {
	                callback(currTime + timeToCall);
	            }, timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }

	    if (!window.cancelAnimationFrame) {
	        window.cancelAnimationFrame = function (id) {
	            clearTimeout(id);
	        };
	    }
	})();

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.swing = swing;
	exports.easeInQuad = easeInQuad;
	exports.easeOutQuad = easeOutQuad;
	exports.easeInOutQuad = easeInOutQuad;
	exports.easeInCubic = easeInCubic;
	exports.easeOutCubic = easeOutCubic;
	exports.easeInOutCubic = easeInOutCubic;
	exports.easeInQuart = easeInQuart;
	exports.easeOutQuart = easeOutQuart;
	exports.easeInOutQuart = easeInOutQuart;
	exports.easeInQuint = easeInQuint;
	exports.easeOutQuint = easeOutQuint;
	exports.easeInOutQuint = easeInOutQuint;
	exports.easeInSine = easeInSine;
	exports.easeOutSine = easeOutSine;
	exports.easeInOutSine = easeInOutSine;
	exports.easeInExpo = easeInExpo;
	exports.easeOutExpo = easeOutExpo;
	exports.easeInOutExpo = easeInOutExpo;
	exports.easeInCirc = easeInCirc;
	exports.easeOutCirc = easeOutCirc;
	exports.easeInOutCirc = easeInOutCirc;
	exports.easeInElastic = easeInElastic;
	exports.easeOutElastic = easeOutElastic;
	exports.easeInOutElastic = easeInOutElastic;
	exports.easeInBack = easeInBack;
	exports.easeOutBack = easeOutBack;
	exports.easeInOutBack = easeInOutBack;
	exports.easeInBounce = easeInBounce;
	exports.easeOutBounce = easeOutBounce;
	exports.easeInOutBounce = easeInOutBounce;
	// t: current time, b: begInnIng value, c: change In value, d: duration
	function swing(t, b, c, d) {
		return easeOutQuad(t, b, c, d);
	}

	function easeInQuad(t, b, c, d) {
		return c * (t /= d) * t + b;
	}

	function easeOutQuad(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	}

	function easeInOutQuad(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * (--t * (t - 2) - 1) + b;
	}

	function easeInCubic(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	}

	function easeOutCubic(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	function easeInOutCubic(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}

	function easeInQuart(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	}

	function easeOutQuart(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}

	function easeInOutQuart(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}

	function easeInQuint(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	}

	function easeOutQuint(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}

	function easeInOutQuint(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}

	function easeInSine(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}

	function easeOutSine(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}

	function easeInOutSine(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}

	function easeInExpo(t, b, c, d) {
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	}

	function easeOutExpo(t, b, c, d) {
		return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	}

	function easeInOutExpo(t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}

	function easeInCirc(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	}

	function easeOutCirc(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	}

	function easeInOutCirc(t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}

	function easeInElastic(t, b, c, d) {
		var s = 1.70158;var p = 0;var a = c;
		if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	}

	function easeOutElastic(t, b, c, d) {
		var s = 1.70158;var p = 0;var a = c;
		if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	}

	function easeInOutElastic(t, b, c, d) {
		var s = 1.70158;var p = 0;var a = c;
		if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	}

	function easeInBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	}

	function easeOutBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	}

	function easeInOutBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	}

	function easeInBounce(t, b, c, d) {
		return c - easeOutBounce(d - t, 0, c, d) + b;
	}

	function easeOutBounce(t, b, c, d) {
		if ((t /= d) < 1 / 2.75) {
			return c * (7.5625 * t * t) + b;
		} else if (t < 2 / 2.75) {
			return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
		} else if (t < 2.5 / 2.75) {
			return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
		}
	}

	function easeInOutBounce(t, b, c, d) {
		if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * .5 + b;
		return easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

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
	      // t: current time, b: begInnIng value, c: change In value, d: duration
	      this._time += delta;
	      this._x = CubicBezier._getPointOnBezierCurve(this._options.controlPoints, this._time);
	      return this._x * this._options.destination;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return this._time >= 1;
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
	  destination: 1
	};
	CubicBezier.Type = "CubicBezier";
	exports.default = CubicBezier;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Easing = __webpack_require__(3);

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
	      // t: current time, b: begInnIng value, c: change In value, d: duration
	      this._time += delta;
	      this._x = this._options.easingFunction(this._time, 0, 1, 1);
	      return this._x * this._options.destination;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return this._time >= 1;
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
	  destination: 1
	};
	Ease.Type = "Ease";
	exports.default = Ease;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Friction = function () {
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
	}();

	Friction.DEFAULT_OPTIONS = {
	  applyAcceleration: function applyAcceleration(accel) {
	    return accel;
	  },
	  friction: 0.1,
	  destination: 1,
	  tolerance: 0.001
	};
	Friction.Type = "FRICTION";
	exports.default = Friction;

/***/ },
/* 7 */
/***/ function(module, exports) {

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

	      return this._x * this._options.destination;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return Math.round(this._v / this._options.tolerance) === 0 && Math.round(this._x / this._options.tolerance) === this._options.destination / this._options.tolerance ? true : false;
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

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// r4k from http://mtdevans.com/2013/05/fourth-order-runge-kutta-algorithm-in-javascript-with-demo/

	var SpringRK4 = function () {
	  function SpringRK4(options) {
	    _classCallCheck(this, SpringRK4);

	    // merge default with passed
	    this._options = _extends({}, SpringRK4.DEFAULT_OPTIONS, options);

	    this._state = {
	      x: this._options.destination - this._options.origin,
	      v: this._options.v
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

	      return this.x;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return Math.round(this._state.v / this._options.tolerance) === 0 && Math.round(this._state.x / this._options.tolerance) === 0 ? true : false;
	    }
	  }, {
	    key: "v",
	    set: function set(v) {
	      this._state.v = v;
	    }
	  }, {
	    key: "x",
	    set: function set(x) {
	      this._state.x = x;
	    },
	    get: function get() {
	      return this._options.destination - this._options.origin - this._state.x + this._options.origin;;
	    }
	  }, {
	    key: "destination",
	    set: function set(destination) {
	      this._options.destination = destination;
	      this._state.x = this._options.destination - this._options.origin;
	    }
	  }, {
	    key: "origin",
	    set: function set(origin) {
	      this._options.origin = origin;
	      this._state.x = this._options.destination - this._options.origin;
	    }
	  }]);

	  return SpringRK4;
	}();

	SpringRK4.DEFAULT_OPTIONS = {
	  stiffness: 100,
	  damping: 20,
	  tolerance: 0.001,
	  x: 1,
	  v: 0,
	  destination: 1,
	  origin: 0
	};
	SpringRK4.Type = "SPRINGRK4";
	exports.default = SpringRK4;

/***/ }
/******/ ])
});
;