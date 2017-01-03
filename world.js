var black = new Sprite("Sprites/black.png");
var cell = new Sprite("Sprites/cell.png");
var gs = new Sprite("Sprites/gs.png");
var remp = new Sprite("Sprites/remp.png");
var bemp = new Sprite("Sprites/bemp.png");
var rhut1 = new Sprite("Sprites/rhut1.png");
var rhut2 = new Sprite("Sprites/rhut2.png");
var rcas1 = new Sprite("Sprites/rcas1.png");
var rcas2 = new Sprite("Sprites/rcas2.png");
var rgf = new Sprite("Sprites/rgf.png");
var bhut1 = new Sprite("Sprites/bhut1.png");
var bhut2 = new Sprite("Sprites/bhut2.png");
var bcas1 = new Sprite("Sprites/bcas1.png");
var bcas2 = new Sprite("Sprites/bcas2.png");
var bgf = new Sprite("Sprites/bgf.png");

function TrackTime(time, track) {
    //THE FINAL COUNTDOWN (so osm)
    track += 50;
    var TIME = {
        t: time,
        track: track
    }
    if(TIME.track >= 1000) {
        TIME.t -= 1;
        TIME.track = 0;
    }
    return TIME;
}

function DrawMap() {
	var ctx = game.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, SIZE, SIZE);
    ctx.fillStyle="white";
    ctx.fill();
    for(var y = 0; y < mapSize; y++) {
		for(var x = 0; x < mapSize; x++) {
            var spr = map[y][x];
            if(spr==13) gs.draw(x*BLOCK, y*BLOCK);
            else if(spr==0) cell.draw(x*BLOCK, y*BLOCK);
            else if(spr==1) remp.draw(x*BLOCK, y*BLOCK);
            else if(spr==2) rhut1.draw(x*BLOCK, y*BLOCK);
            else if(spr==3) rcas1.draw(x*BLOCK, y*BLOCK);
            else if(spr==4) rhut2.draw(x*BLOCK, y*BLOCK);
            else if(spr==5) rcas2.draw(x*BLOCK, y*BLOCK);
            else if(spr==6) rgf.draw(x*BLOCK, y*BLOCK);
            else if(spr==7) bemp.draw(x*BLOCK, y*BLOCK);
            else if(spr==8) bhut1.draw(x*BLOCK, y*BLOCK);
            else if(spr==9) bcas1.draw(x*BLOCK, y*BLOCK);
            else if(spr==10) bhut2.draw(x*BLOCK, y*BLOCK);
            else if(spr==11) bcas2.draw(x*BLOCK, y*BLOCK);
            else bgf.draw(x*BLOCK, y*BLOCK);
        };
	};
};