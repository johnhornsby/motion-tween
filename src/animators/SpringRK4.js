// r4k from http://mtdevans.com/2013/05/fourth-order-runge-kutta-algorithm-in-javascript-with-demo/
export default class SpringRK4 {
  

  static DEFAULT_OPTIONS = {
    stiffness: 100,
    damping: 20,
    tolerance: 0.001,
    x: 1,
    v: 0,
    destination: 1,
    origin: 0
  }

  static Type = "SPRINGRK4";


  constructor(options) {
    // merge default with passed
    this._options = {
      ...SpringRK4.DEFAULT_OPTIONS,
      ...options
    }

    this._state = {
      x: this._options.destination - this._options.origin,
      v: this._options.v
    }
  }


  _rk4(state, a, dt) {
    const x = state.x;
    const v = state.v;
    // Returns final (position, velocity) array after time dt has passed.
    //        x: initial position
    //        v: initial velocity
    //        a: acceleration function a(x,v,dt) (must be callable)
    //        dt: timestep
    const x1 = x;
    const v1 = v;
    const a1 = a(x1, v1, 0);

    const x2 = x + 0.5 * v1 * dt;
    const v2 = v + 0.5 * a1 * dt;
    const a2 = a(x2, v2, dt / 2);

    const x3 = x + 0.5 * v2 * dt;
    const v3 = v + 0.5 * a2 * dt;
    const a3 = a(x3, v3, dt / 2);

    const x4 = x + v3 * dt;
    const v4 = v + a3 * dt;
    const a4 = a(x4, v4, dt);

    const xf = x + (dt / 6) * (v1 + 2 * v2 + 2 * v3 + v4);
    const vf = v + (dt / 6) * (a1 + 2 * a2 + 2 * a3 + a4);

    return {
      x: xf,
      v: vf
    }
  }


  _acceleration(x, v, dt) {
    // This particular one models a spring with a 1kg mass
    return - this._options.stiffness * x - this._options.damping * v;
  }


  step(delta) {
    this._state = this._rk4(this._state, ::this._acceleration, delta);

    return this.x;
  }


  isFinished() {
    return ( Math.round( this._state.v / this._options.tolerance) === 0 && Math.round( this._state.x / this._options.tolerance) === 0 ) ? true: false;
  }


  set v(v) {
    this._state.v = v;
  }
  
  
  set x(x) {
    this._state.x = x;
  }
  
  set destination(destination) {
    this._options.destination = destination;
    this._state.x = this._options.destination - this._options.origin;
  }

  set origin(origin) {
    this._options.origin = origin;
    this._state.x = this._options.destination - this._options.origin;
  }

  get x() {
    return (this._options.destination - this._options.origin - this._state.x) + this._options.origin;;
  }
}