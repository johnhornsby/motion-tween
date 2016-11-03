export default class Spring {
  

  static DEFAULT_OPTIONS = {
    stiffness: 100,
    damping: 20,
    tolerance: 0.001,
    destination: 1
  }

  static Type = "SPRING";


  constructor(options) {
    // merge default with passed
    this._options = {
      ...Spring.DEFAULT_OPTIONS,
      ...options
    }

    this._v = 0;
    this._x = 0;
  }


  step(delta) {
    const k = 0 - this._options.stiffness;
    const b = 0 - this._options.damping;

    const F_spring = k * (this._x - 1);
    const F_damper = b * this._v;

    const mass = 1;

    this._v += ((F_spring + F_damper) / mass) * delta;
    this._x += this._v * delta;

    // remember x goes from 0 - 1
    return this._options.origin + (this._x * (this._options.destination - this._options.origin));
  }


  isFinished() {
  	// round v
  	const velocity = Math.round( this._v / this._options.tolerance);
  	// recalculate x
  	const x = this._options.origin + (this._x * (this._options.destination - this._options.origin));
  	// round it
  	const roundedX = Math.round( x / this._options.tolerance) * this._options.tolerance;

    return (velocity === 0 && roundedX === this._options.destination ) ? true: false;
  }
}
