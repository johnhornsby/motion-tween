import Utils from "./Utils";
import * as Easing from './Easing';
import CubicBezier from "./animators/CubicBezier";
import Ease from "./animators/ease";
import Friction from "./animators/friction";
import Spring from "./animators/spring";
import SpringRK4 from "./animators/springRK4";

export default class MotionTween {

  static DEFAULT_OPTIONS = { 
    time: 1000,
    startValue: 0,
    endValue: 1,
    animatorType: Friction.Type,
    animatorOptions: null, // use defaults of selected type
    update: function(){},
    complete: function(){}
  };

  static easingFunction = {
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

  static animatorType = {
    spring: Spring.Type,
    springRK4: SpringRK4.Type,
    friction: Friction.Type,
    ease: Ease.Type,
    cubicBezier: CubicBezier.Type
  };

  


  constructor(options) {
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
  
  
  static getValue(animatorType, animatorOptions, time) { return MotionTween._getValue(animatorType, animatorOptions, time); }

  start() { this._start() }

  destroy() { this._destroy() }

  

  
  _init(options) {
    // Deep merge of default and incoming options
    Utils.extend(this._options, MotionTween.DEFAULT_OPTIONS, true);
    Utils.extend(this._options, options, true);

    // time we can ignore for some of the animators
    this._time = this._options.time;
    this._startX = this._options.startValue;
    this._endX = this._options.endValue;
  }
  

  _start() {
    this._lastTime = 0;
    this._startTime = 0;

    this._options.animatorOptions.destination = this._endX;
    this._options.animatorOptions.origin = this._startX;

    switch(this._options.animatorType) {
      case Spring.Type:
        this._animator = new Spring(this._options.animatorOptions);
        break;
      case SpringRK4.Type:
        this._animator = new SpringRK4(this._options.animatorOptions);
        break;
      case Friction.Type:
        this._animator = new Friction(this._options.animatorOptions);
        break;
      case CubicBezier.Type:
        this._animator = new CubicBezier(this._options.animatorOptions);
        break;
      default:
        this._animator = new Ease(this._options.animatorOptions);
    }
    
    this._isAnimating = true;
    this._startTime = this._lastTime = new Date().getTime();

    this._requestionAnimationFrameID = window.requestAnimationFrame(::this._tick);
  }
  
  
  _destroy() {
    window.cancelAnimationFrame(this._requestionAnimationFrameID);
    this._options = null;
  }

  
  _tick() {
    const now = new Date().getTime();

    let delta = (now - this._lastTime) / this._time;
    this._lastTime = now;

    // pass in normalised delta
    let x = this._animator.step(delta);

    if (this._animator.isFinished() === false) {

      // invert for SpringRK4, SpringRK4 concludes from destination to 0
      // if (this._options.animatorType === SpringRK4.Type) {
      //   x = (x - this._endX) * -1;
      // }

      this._x = x;
      
      this._options.update(this._x);
      this._requestionAnimationFrameID = window.requestAnimationFrame(::this._tick);
    } else {
      this._x = this._endX
      this._options.update(this._x);
      this._options.complete();
      this._isAnimating = false;
    }
  }

  static _getValue(animatorType, animatorOptions, time) {
    switch(animatorType) {
      case CubicBezier.Type:
        return CubicBezier.getValue(animatorOptions, time);
        break;
      default:
         return Ease.getValue(animatorOptions, time);
    }
  }
}