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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Utils = __webpack_require__(2);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _animatorsFriction = __webpack_require__(3);

	var _animatorsFriction2 = _interopRequireDefault(_animatorsFriction);

	var _animatorsSpring = __webpack_require__(4);

	var _animatorsSpring2 = _interopRequireDefault(_animatorsSpring);

	var _animatorsSpringRK4 = __webpack_require__(5);

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
	        default:
	          this._animator = new _animatorsFriction2["default"](this._options.animatorOptions);
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
	        // console.log(`x=${this._x} normalisedAnimatedX=${normalisedAnimatedX}`);
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Utils = (function () {
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
	})();

	exports['default'] = new Utils();

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
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

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
	      friction: 0.1,
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
	    this._destinationX = 1;
	    this._acceleration = (this._destinationX - this._x) * this._options.friction;
	    this._previousX = 0;
	  }

	  _createClass(Friction, [{
	    key: "step",
	    value: function step(delta) {
	      // delta is ignored in the FrictionAnimator
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
	      return Math.round(this._v / this._options.tolerance) === 0 && Math.round(this._x / this._options.tolerance) === 1 / this._options.tolerance ? true : false;
	    }
	  }]);

	  return Friction;
	})();

	exports["default"] = Friction;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	// r4k from http://mtdevans.com/2013/05/fourth-order-runge-kutta-algorithm-in-javascript-with-demo/
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpringRK4 = (function () {
	  _createClass(SpringRK4, null, [{
	    key: "DEFAULT_OPTIONS",
	    value: {
	      stiffness: 100,
	      damping: 20,
	      tolerance: 0.001
	    },
	    enumerable: true
	  }, {
	    key: "Type",
	    value: "SPRINGRK4",
	    enumerable: true
	  }]);

	  function SpringRK4(options) {
	    _classCallCheck(this, SpringRK4);

	    // merge default with passed
	    this._options = _extends({}, SpringRK4.DEFAULT_OPTIONS, options);

	    // set position to 1 as we are wanting the result normalised
	    this._state = {
	      x: 1,
	      v: 0
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
	      // the calculation gives values starting from 1 and then finishing at 0,
	      // we need to transform the values to work from 0 to 1.
	      return (this._state.x - 1) * -1;
	    }
	  }, {
	    key: "isFinished",
	    value: function isFinished() {
	      return Math.round(this._state.v / this._options.tolerance) === 0 && Math.round(this._state.x / this._options.tolerance) === 0 ? true : false;
	    }
	  }]);

	  return SpringRK4;
	})();

	exports["default"] = SpringRK4;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;