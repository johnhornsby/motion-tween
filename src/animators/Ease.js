import * as Easing from '../Easing';

export default class Ease {
  

  static DEFAULT_OPTIONS = {
    tolerance: 0.001,
    easingFunction: Easing.easeOutQuad,
    destination: 1
  }

  static Type = "Ease";


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
    // t: current time, b: begInnIng value, c: change In value, d: duration
    this._time += delta;
    this._x = this._options.easingFunction(this._time, 0, 1, 1);
    return this._x * this._options.destination;
  }


  isFinished() {
    return this._time >= 1
  }
}