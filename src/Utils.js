
const Utils = class Utils {
    extend(destination, source, isDeep = false) {
        let hasDepth = false
        for (let property in source) {
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

    
  
    sum(arr) {
        let sum = 0;
        let d = arr.length;
        while (d--) {
            sum += arr[d];
        }
        return sum;
    }
}

export default new Utils();

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
        
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();