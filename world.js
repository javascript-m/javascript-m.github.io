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
    for(var y = 0; y < mapSize; y++) {
		for(var x = 0; x < mapSize; x++) {
            var spr = map[y][x];
            if(!mapAnimate[y][x]) st1.draw(x*BLOCK, y*BLOCK, spr);
        };
	};
    //NACRTAJ OBA TRONA!!
};