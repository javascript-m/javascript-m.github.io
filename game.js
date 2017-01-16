/*GLAVNI ALGORITAM*/
//U MAPU SVE OBRNUTO (y pa x)
function insideBoard(x, y) {
    return (x>=0 && x < mapSize && y >=0 && y < mapSize);
}
function whatCanIDo(x, y) {
    var nothing=true;
    var smX = [0,1,0,-1,0];
    var smY = [-1,0,1,0,0]
    var casSmX = [-1,-1,-1,0,0,1,1,1];
    var casSmY = [-1,0,1,-1,1,-1,0,1];
    
    for(var i=0; i<5; i++) { //Za svaki od 4 okolna polja
        if(insideBoard(y+smY[i], x+smX[i])) {
            for(var j=1; j<=6; j++) {
                if(map[y+smY[i]][x+smX[i]]==j+6*POTEZ) {
                    nothing=false;
                    break;
                }
            }
        }
        if(!nothing) break;
    }
    
    if(nothing || (x==y && y==(mapSize-1)*POTEZ) || ($.isNumeric(map[y][x])==false)) {
        return 0; //YOU CAN'T PLAY HERE
    };
    
    var here = map[y][x]-POTEZ*6;
    
    //You can play here
    if(map[y][x]==0) return 6; //Empty C1
    else if(here==6) return 1;
    else if(map[y][x]-!POTEZ*6==6 || map[y][x]==13) return 8; //Green field C1
    else if(here <= 6 && here >= 1) { //YOURS?
        if(here > 3 && here != 6) return 1; //Upgraded building, YOU CAN'T DO ANYTHING
        else if(here == 1) return 4; //BUILD
        else if(here == 2) return 2; //Upgrade a hut
        else if(here == 3) return 3; //Upgrade a castle
    } else { //OPPONENT'S
        var his = map[y][x]-!POTEZ*6;
        if(his == 3 || his == 5) return 7; //Castle C1 
        else { //Hut or an empty lot
            var protected = 0;
            for(var i=0; i<8; i++) { //IsItProtected
                if(insideBoard(y+casSmY[i], x+casSmX[i])) {
                    var h = map[y+casSmY[i]][x+casSmX[i]]-!POTEZ*6;
                    if(h==3 || h==5) { //There is a castle nearby
                        if(protected==0 && h==3) {
                            protected=1;
                        }
                        else if(h==5) {
                            protected=2;
                            break;
                        }
                    }
                }
            }
            if(protected==0) return 9; //Not protected
            else if(protected==1) return 10; //P1
            else return 11; //P2
        }
    }
    
    /*
        0-empty sq
        1-empty sq p1
        2-hut p1
        3-castle p1
        4-hutUp p1
        5-castleUp p1
        6-gF p1
        7-empty sq p2
        8-hut p2
        9-castle p2
        10-hutUp p2
        11-castleUp p2
        12-gf p2
        13-gf noOne
    */
}
function putInMenu(w) {
    var index;
    if(w >= 6) index=Math.floor(w/3)+1;
    else index=Math.floor(w/2);
    
    var s = junky[index].length;
    
    $("#gameMenu").children().remove();
    
    var c = coins[POTEZ];
    junky[index][w%s](w%s, c);
}