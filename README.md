# Motion Tween
A simple tween library that does nothing more than tween, no connection to the dom!

## Example

```javascript
import MotionTween from 'motion-tween';

const tween = new MotionTween({
	time: 1000,
	startValue: 0,
	endValue: 100,
	update: (x) => {
		console.log(x);
	}
});

tween.start();
```

## Animators
Motion Tween enabled you to animate your values using a number of different typical animators. 

* Cubic Bezier
* Easing Functions 
* Friction
* Spring
* Spring RK4

Each animator has its own customisable options, but is utilised in the same way.

## Iteration
Motion tween calculates window.requestAnimationFrame to update your value upon each frame. The amount updated is related to the time passed between each frame, this is all calculated by Motion Tween.

## Configuration
You can configure Motion Tween in the startard way by passing in a configuraton object. The default options are

```javascript
{ 
    time: 1000,
    startValue: 0,
    endValue: 1,
    animatorType: MotionTween.animatorType.friction,
    animatorOptions: {}
}
```

## Update and Completion
Motion Tween does nothing but tween the values, you are responsible for updating whatever you need to update. Within the configuration options you can specify an update function, this is called every frame passing the tweened value to the function.

```javascript
{ 
    time: 1000,
    startValue: 0,
    endValue: 1,
    update: (x) => {
    	// update my animation with a value between 0 and 1 over 1 second
	}
}
```

You can also specify a complete function called after the final update function. 

```javascript
{
	startValue: 50
	endValue: 100,
    complete: (x) => {
    	// final x will the endValue
	}
}
```



