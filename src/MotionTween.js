import Utils from "./Utils";
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
  }
  

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

    switch(this._options.animatorType) {
      case Spring.Type:
        this._animator = new Spring(this._options.animatorOptions);
        break;
      case SpringRK4.Type:
        this._animator = new SpringRK4(this._options.animatorOptions);
        break;
      default:
        this._animator = new Friction(this._options.animatorOptions);
    }
    
    // this._animator = new Spring({stiffness: 100, damping: 20, tolerance: 0.01});
    this._isAnimating = true;
    this._startTime = this._lastTime = new Date().getTime();
    //this._tick(); 
    this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
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
    const normalisedAnimatedX = this._animator.step(delta);

    if (this._animator.isFinished() === false) {
      this._x = this._startX + ((this._endX - this._startX) * normalisedAnimatedX);
      // console.log(`x=${this._x} normalisedAnimatedX=${normalisedAnimatedX}`);
      this._options.update(this._x);
      this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
    } else {
      this._x = this._endX
      this._options.update(this._x);
      this._options.complete();
      this._isAnimating = false;
    }
  }
}