

export default class CubicBezier {
  

  static DEFAULT_OPTIONS = {
    tolerance: 0.001,
    controlPoints: [.15, .66, .83, .67],
    duration: 1,
    destination: 1,
    origin: 0
  };

  static Type = "cubicBezier";


  constructor(options) {
    // merge default with passed
    this._options = {
      ...CubicBezier.DEFAULT_OPTIONS,
      ...options
    }

    this._x = 0;
    this._time = 0
  }


  static getValue(options, time) {
    return CubicBezier._getPointOnBezierCurve(options.controlPoints, time);
  }


  step(delta) {
    this._time += delta;

    const position = this._time / this._options.duration;

    this._x = CubicBezier._getPointOnBezierCurve(this._options.controlPoints, position);
    return this._options.origin + (this._x * (this._options.destination - this._options.origin));
  }


  static _getPointOnBezierCurve(controlPoints, l) {
    const a1 = {x: 0, y: 0};
    const a2 = {x: 1, y: 1};

    let c1 = {x: controlPoints[0], y: controlPoints[1]};
    let c2 = {x: controlPoints[2], y: controlPoints[3]};

    const b1 = CubicBezier._interpolate(a1, c1, l);
    const b2 = CubicBezier._interpolate(c1, c2, l);
    const b3 = CubicBezier._interpolate(c2, a2, l);

    c1 = CubicBezier._interpolate(b1, b2, l);
    c2 = CubicBezier._interpolate(b2, b3, l);

    return CubicBezier._interpolate(c1, c2, l).y;
  }


  static _interpolate(p1, p2, l) {
      const p3 = {};

      p3.x = p1.x + ((p2.x - p1.x) * l);
      p3.y = p1.y + ((p2.y - p1.y) * l);

      return p3;
  }


  isFinished() {
    return this._time >= this._options.duration;
  }
}
