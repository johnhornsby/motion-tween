import MotionTween from '../../lib/MotionTween';

const block1 = document.getElementsByClassName('block1')[0];
const block2 = document.getElementsByClassName('block2')[0];
const block3 = document.getElementsByClassName('block3')[0];
const block4 = document.getElementsByClassName('block4')[0];
const block5 = document.getElementsByClassName('block5')[0];
const block6 = document.getElementsByClassName('block6')[0];

const endX = window.innerWidth - block1.clientWidth;

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

new MotionTween({
	startValue: 0,
	endValue: endX,
	update: (x) => {
		block5.style.transform = `translateX(${x}px)`;
	},
	complete: (x) => {
		console.log('5 complete');
	},
	animatorType: MotionTween.animatorType.cubicBezier,
	animatorOptions: {
		controlPoints: [.15, .66, .83, .67]
	}
}).start();

new MotionTween({
	startValue: 0,
	endValue: endX,
	update: (x) => {
		block6.style.transform = `translateX(${x}px)`;
	},
	complete: (x) => {
		console.log('6 complete');
	},
	animatorType: MotionTween.animatorType.springRK4,
	animatorOptions: {
		stiffness: 200,
    	damping: 10
	}
}).start();


const animatorOptions = {
	easingFunction: MotionTween.easingFunction.easeOutQuad
}

const time = 0.5;

const animatorType = MotionTween.animatorType.ease;

const factoryValue = MotionTween.getValue(animatorType, animatorOptions, time);

console.log(`Factory Value is ${factoryValue}`);


// Dynamic Motion Tween Play Ground Ha!
let dynamicTween;

const startButton = document.getElementById('startButton');
const originElement = document.getElementById('origin');
const destinationElement = document.getElementById('destination');
const animationTypeElement = document.getElementById('animationType');
const outputElement = document.getElementById('output');


animationTypeElement.addEventListener('change', function() {
	document.querySelector('.animation-option--selected').classList.remove('animation-option--selected');
	const id = animationTypeElement.value + "Options";
	document.getElementById(id).classList.add('animation-option--selected');
});


function getAnimationOptions() {
	switch(animationTypeElement.value) {
	case 'friction':
		return {
			'friction': parseFloat(document.getElementById('frictionOption').value)
		};

	case 'ease':
		return {
			'easingFunction': MotionTween.easingFunction[document.getElementById('easingFunction').value],
			'duration': parseFloat(document.getElementById('durationEaseOption').value)
		};

	case 'cubicBezier':
		return {
			'controlPoints': [
				parseFloat(document.getElementById('cubicBezier1').value),
				parseFloat(document.getElementById('cubicBezier2').value),
				parseFloat(document.getElementById('cubicBezier3').value),
				parseFloat(document.getElementById('cubicBezier4').value),
			],
			'duration': parseFloat(document.getElementById('durationCubicBezierOption').value)
		};

	case 'spring':
		return {
			'stiffness': parseFloat(document.getElementById('springStiffness').value),
			'damping': parseFloat(document.getElementById('springDamping').value)
		};

	case 'springRK4':
		return {
			'stiffness': parseFloat(document.getElementById('springRK4Stiffness').value),
			'damping': parseFloat(document.getElementById('springRK4Damping').value)
		};
	}
}


startButton.addEventListener('click', function() {
	if (dynamicTween) {
		dynamicTween.destroy();
		dynamicTween = null
	}

	outputElement.innerHTML = "";

	const options = {
		startValue: parseFloat(originElement.value),
		endValue: parseFloat(destinationElement.value),
		update: (x) => {
			outputElement.innerHTML += x + '\n';
		},
		complete: (x) => {
			console.log('complete');
		},
		animatorType: animationTypeElement.value,
		animatorOptions: getAnimationOptions()
	}

	dynamicTween = new MotionTween(options).start();
});












