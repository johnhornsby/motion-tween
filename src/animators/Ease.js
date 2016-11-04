import * as Easing from '../Easing';

export default class Ease {
  

  static DEFAULT_OPTIONS = {
    tolerance: 0.001,
    easingFunction: Easing.easeOutQuad,
    destination: 1,
    duration: 1,
    origin: 0
  }

  static Type = "ease";


  constructor(options) {
    // merge default with passed
    this._options = {
      ...Ease.DEFAULT_OPTIONS,
      ...options
    }

    this._x = 0;
    this._time = 0
  }


  static getValue(options, time) {
    return options.easingFunction(time, 0, 1, 1);
  }


  step(delta) {
    this._time += delta;
    if (this._time >= this._options.duration) {
    	this._x = 1;
    } else {
    	// t: current time, b: begInnIng value, c: change In value, d: duration
    	this._x = this._options.easingFunction(this._time, 0, 1, this._options.duration);
    }
    return this._options.origin + (this._x * (this._options.destination - this._options.origin));
  }


  isFinished() {
    return this._time >= this._options.duration
  }
}
