

export default class CubicBezier {
  

  static DEFAULT_OPTIONS = {
    tolerance: 0.001,
    controlPoints: [.15, .66, .83, .67]
  }

  static Type = "CubicBezier";


  constructor(options) {
    // merge default with passed
    this._options = {
      ...CubicBezier.DEFAULT_OPTIONS,
      ...options
    }

    this._x = 0;
    this._time = 0
  }


  step(delta) {
    // t: current time, b: begInnIng value, c: change In value, d: duration
    this._time += delta;
    this._x = this._getPointOnBezierCurve(this._options.controlPoints, this._time);
    return this._x;
  }

  _getPointOnBezierCurve(controlPoints, l) {
    const a1 = {x: 0, y: 0};
    const a2 = {x: 1, y: 1};

    let c1 = {x: controlPoints[0], y: controlPoints[1]};
    let c2 = {x: controlPoints[2], y: controlPoints[3]};

    const b1 = this._interpolate(a1, c1, l);
    const b2 = this._interpolate(c1, c2, l);
    const b3 = this._interpolate(c2, a2, l);

    c1 = this._interpolate(b1, b2, l);
    c2 = this._interpolate(b2, b3, l);

    return this._interpolate(c1, c2, l).y;
  }

  _interpolate(p1, p2, l) {
      const p3 = {};

      p3.x = p1.x + ((p2.x - p1.x) * l);
      p3.y = p1.y + ((p2.y - p1.y) * l);

      return p3;
  }

  isFinished() {
    return this._time >= 1
  }
}