var casSmX = [-1,-1,-1,0,0,1,1,1];
var casSmY = [-1,0,1,-1,1,-1,0,1];
function insideBoard(x, y) {
    return (x>=0 && x < mapSize && y >=0 && y < mapSize);
}
function computerPlays(x, y, s) {
    var an=[x, y];
    if(s==0) { //Osvajanje Empty
        SEQ=[16,17,18,19,20];
        coins[1]-=1;
        map[x][y]=7;
    } else if(s==1) {
        SEQ=[16,17,18,19,20];
        coins[1]-=1;
        map[x][y]=12;
    } else if(s==2) { //Gradi kucu
        houses[1]+=1;
        SEQ=[31,32,33,34];
        map[x][y]=8;
        coins[1]-=2;
    } else if(s==3) { //Gradi dvorac
        SEQ=[26,27,28,29,30];
        map[x][y]=9;
        coins[1]-=3;
    } else if(s==4) { //Upgrade kuca
        houses[1]+=1;
        SEQ=[21,22,23,24,25];
        map[x][y]=10;
        coins[1]-=3;
    } else if(s==5) { //Upgrade dvorac
        SEQ=[31,32,33,34,35];
        map[x][y]=11;
        coins[1]-=4;
    } else { //Osvoji tude
        SEQ=[16,17,18,19,20];
        if(map[x][y]==2) houses[0]-=1;
        else if(map[x][y]==4) houses[0]-=2;
        map[x][y]+=6;
        //Zasticeno
        var dod=0;
        for(var i=0; i<8; i++) {
            if(insideBoard(x+casSmX[i], y+casSmY[i])) {
                if(map[x+casSmX[i]][y+casSmY[i]]==3 && dod<1) dod=1;
                else if(map[x+casSmX[i]][y+casSmY[i]]==5) dod=2;
            }
        }
        if(map[x][y]-6 != 6) coins[1]-=1+dod;
        else coins[1]-=1; //Ne cuvaj rudnike
    }
    if(coins[1]<0) coins[1]=0;
    mapAnimate[an[0]][an[1]]=SEQ;
    setTimeout(function() {
        mapAnimate[an[0]][an[1]]=0;
    }, 2000);
}