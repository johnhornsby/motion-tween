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