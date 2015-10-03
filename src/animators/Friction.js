export default class Friction {
  

  static DEFAULT_OPTIONS = {
    applyAcceleration: (accel) =>  accel,
    friction: 0.1,
    destination: 1,
    tolerance: 0.001
  }

  static Type = "FRICTION";


  constructor(options) {
    // merge default with passed
    this._options = {
      ...Friction.DEFAULT_OPTIONS,
      ...options
    }
    this._v = 0;
    this._x = 0;
    this._acceleration = (this._options.destination - this._x) * this._options.friction;
    this._previousX = 0;
  }


  step(delta) {
    // delta is ignored in the FrictionAnimator
    this._acceleration = this._options.applyAcceleration(this._acceleration);

    this._v += this._acceleration;
    this._x += this._v;
    this._v *= (1 - this._options.friction);
    
    // reset the acceleration as this is set initially
    this._acceleration = 0;
    this._previousX = this._x;

    return this._x;
  }


  isFinished() {
    return ( Math.round( this._v / this._options.tolerance) === 0 && Math.round( this._x / this._options.tolerance) === 1 / this._options.tolerance ) ? true: false;
  }
}