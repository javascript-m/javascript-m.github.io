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
            if($.isNumeric(mapAnimate[y][x])==true) {
                st1.draw(x*BLOCK, y*BLOCK, map[y][x]);
            }
            else st1.draw(x*BLOCK, y*BLOCK, mapAnimate[y][x]);
        };
	};
    //NACRTAJ OBA TRONA!!
    st1.draw(0, 0, 14);
    st1.draw((mapSize-1)*BLOCK, (mapSize-1)*BLOCK, 15);
};