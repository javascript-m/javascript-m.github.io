var Sprite = function(fn) {
    this.load = function(filename) { this.image = new Image(); this.image.src = filename; return this; };
	
    this.image=null;
    this.spritesheet=null;
    
    if(fn instanceof Spritesheet) {
        this.spritesheet=fn;
        this.image=this.spritesheet.image;
    }
    else if (fn != undefined && fn != "" && fn != null) { //Load from sprite
        this.load(fn);
    }
    //Overlapping functions C++
    this.draw = function(x, y, various) {
		if(various == undefined) { //Normal sprite, various is not passed
			Context.context.drawImage(this.image, x, y, BLOCK, BLOCK);
		} //If various is a single numeric frame ID (exp. 17)
		else if($.isNumeric(various) && various >= 0) {
			var res = i2xy(various, 8); //Uzmi x i y pozicije
			Context.context.drawImage(this.image, res[0]*BLOCK, res[1]*BLOCK, BLOCK, BLOCK, x, y, BLOCK, BLOCK);
		} //If  various is an Animation sequence (exp. [12,13,14,15])
		else if(various.length != undefined && various.length > 0) {
            if(AnimationCounter[AnimationCounterIndex].animationDelay++ >= 4) { //Animation delay usporava stvar
                AnimationCounter[AnimationCounterIndex].animationDelay = 0;
				AnimationCounter[AnimationCounterIndex].animationIndexCounter++; //Idemo na sljedecu slicicu
				if(AnimationCounter[AnimationCounterIndex].animationIndexCounter >= various.length) { //Gleda je li trenutna slicica u arrayu
					AnimationCounter[AnimationCounterIndex].animationIndexCounter = 0;
				}
				AnimationCounter[AnimationCounterIndex].animationCurrentFrame = various[AnimationCounter[AnimationCounterIndex].animationIndexCounter]; //Uzme broj trenutne slicice
            }
            AnimationCounter[AnimationCounterIndex].animationCurrentFrame = various[AnimationCounter[AnimationCounterIndex].animationIndexCounter];
			var res = i2xy(AnimationCounter[AnimationCounterIndex].animationCurrentFrame, 8);
			Context.context.drawImage(this.image, res[0]*BLOCK, res[1]*BLOCK, BLOCK, BLOCK, x, y, BLOCK, BLOCK); 
		
            AnimationCounterIndex++;
        }
	}
};