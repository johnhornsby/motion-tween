import MotionTween from '../../lib/MotionTween';

const block1 = document.getElementsByClassName('block1')[0];
const block2 = document.getElementsByClassName('block2')[0];
const block3 = document.getElementsByClassName('block3')[0];
const block4 = document.getElementsByClassName('block4')[0];

const endX = window.innerWidth - block1.clientWidth

new MotionTween({
	time: 2000,
	startValue: 0,
	endValue: endX,
	update: (x) => {
		block1.style.transform = `translateX(${x}px)`;
	},
	complete: (x) => {
		console.log('1 complete');
	},
	animatorType: MotionTween.animatorType.ease,
	animatorOptions: {
		easingFunction: MotionTween.easingFunction.easeOutQuad
	}
}).start();

new MotionTween({
	startValue: 0,
	endValue: endX,
	update: (x) => {
		block2.style.transform = `translateX(${x}px)`;
	},
	complete: (x) => {
		console.log('2 complete');
	},
	animatorType: MotionTween.animatorType.friction,
	animatorOptions: {
		friction: 0.05,
		tolerance: 0.0001
	}
}).start();

new MotionTween({
	startValue: 0,
	endValue: endX,
	update: (x) => {
		block3.style.transform = `translateX(${x}px)`;
	},
	complete: (x) => {
		console.log('3 complete');
	},
	animatorType: MotionTween.animatorType.spring,
	animatorOptions: {
		stiffness: 100,
    	damping: 10
	}
}).start();

new MotionTween({
	startValue: 0,
	endValue: endX,
	update: (x) => {
		block4.style.transform = `translateX(${x}px)`;
	},
	complete: (x) => {
		console.log('4 complete');
	},
	animatorType: MotionTween.animatorType.springRK4,
	animatorOptions: {
		stiffness: 200,
    	damping: 10
	}
}).start();