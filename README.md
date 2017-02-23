# Motion Tween
A simple tween library that does nothing more than tween, no connection to the dom!


## Example

```javascript
import MotionTween from 'motion-tween';

const element = document.querySelector('.my-element');

const tween = new MotionTween({
	time: 1000,
	startValue: 0,
	endValue: window.innerWidth,
	update: (x) => {
		element.style.transform = `translateX(${x}px)`;
	},
	complete: (x) => {
		console.log('1 complete');
	},
	animatorType: MotionTween.animatorType.ease,
	animatorOptions: {
		easingFunction: MotionTween.easingFunction.easeOutQuad
	}
});

tween.start();
```
