var Animate = function(animationDelay, animationIndexCounter, animationCurrentFrame) {
	this.animationDelay = animationDelay;
	this.animationIndexCounter = animationIndexCounter;
	this.animationCurrentFrame = animationCurrentFrame;
}

var AnimationIndexCounter = 0;
var AnimationCounter = new Array();

function InitializeAnimationCounters () {
	for (var i = 0; i < 32000; i++) {
		AnimationCounter[i] = new Animate(0, 0, 0);
	}
};

function ResetAnimationCounter() {
	AnimationIndexCounter = 0;
}