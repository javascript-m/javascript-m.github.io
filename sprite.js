var Sprite = function(fn) {
    this.load = function(filename) { this.image = new Image(); this.image.src = filename; return this; };
	
    // Load from sprite
    if (fn != undefined && fn != "" && fn != null) {
        this.load(fn);
    }

    //DrawImage
    this.draw = function(x, y) {
        Context.context.drawImage(this.image, x, y, BLOCK, BLOCK);
    };

};