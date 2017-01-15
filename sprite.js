var Sprite = function(fn) {
    this.load = function(filename) { this.image = new Image(); this.image.src = filename; return this; };
	
    // Load from sprite
    if (fn != undefined && fn != "" && fn != null) {
        this.load(fn);
    }

    this.draw = function(x, y, various) {
		if(various == undefined) {
			Context.context.drawImage(this.image, x, y, BLOCK, BLOCK);
		} 
		//If various is a single numeric frame ID (npr. 17)
		else if($.isNumeric(various) && various >= 0) {
			var res = i2xy(various, 8);
			Context.context.drawImage(this.image, res[0]*BLOCK, res[1]*BLOCK, BLOCK, BLOCK, x, y, BLOCK, BLOCK);
		}
		//If  various is an Animation sequence (npr. [12,13,14,15]) /*OVO TREBA ZNAT OBJASNIT*/
		else if(various.length != undefined && various.length > 0) {
            if(AnimationCounter[AnimationIndexCounter].animationDelay++ >= 3) { //Ovaj animation delay jos nisam sig sta znaci
                AnimationCounter[AnimationIndexCounter].animationDelay = 0; //Pojasni si ovo
				AnimationCounter[AnimationIndexCounter].animationIndexCounter++; //Idemo na sljedecu slicicu
				if(AnimationCounter[AnimationIndexCounter].animationIndexCounter >= various.length) { //Gleda je li trenutna slicica u arrayu
					AnimationCounter[AnimationIndexCounter].animationIndexCounter = 0;
				}
				AnimationCounter[AnimationIndexCounter].animationCurrentFrame = various[AnimationCounter[AnimationIndexCounter].animationIndexCounter]; //Uzme broj trenutne slicice
			}
		
			var res = i2xy(AnimationCounter[AnimationIndexCounter].animationCurrentFrame, 8); //Nadi x, y,  od slicice (tj broj polja u mrezi)
		
			Context.context.drawImage(this.image, res[0]*BLOCK, res[1]*BLOCK, BLOCK, BLOCK, x, y, BLOCK, BLOCK); //Nacrtaj slicicu
			
			AnimationIndexCounter++;
		}
	}
};