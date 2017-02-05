function computerPlays(x, y, s) {
    var an=[x, y];
    if(s==0) { //Osvajanje
        SEQ=[16,17,18,19];
        if(map[x][y]==13 || map[x][y]==6) { //Green field
            coins[1]-=1;
            map[x][y]=6;
        } else if(map[x][y]==0) { //Empty
            coins[1]-=1;
            map[x][y]=7;
        } else {
            map[x][y]+=2;
            coins[1]-=2;
        }
    }  else if(s==1) { //Gradi kucu
        SEQ=[31,32,33,34];
        map[x][y]+=1;
        coins[1]-=2;
    } else if(s==2) { //Upgrade
        SEQ=[21,22,23,24];
        map[x][y]+=2;
        coins[1]-=map[x][y]-7;
    } else if(s==3) { //Gradi dvorac
        SEQ=[26,27,28,29];
        map[x][y]+=2;
        coins[1]-=3;
    }
    mapAnimate[an[0]][an[1]]=SEQ;
    setTimeout(function() {
        mapAnimate[an[0]][an[1]]=0;
    }, 2000);
}
/*function computerBuildAHut(x, y) {
    map[x][y]+=1; //Sto je dosad bilo(empty field) +1
    var an=[x, y];
    SEQ=[31,32,33,34];
    mapAnimate[an[0]][an[1]]=SEQ;
    setTimeout(function() {
        mapAnimate[an[0]][an[1]]=0;
    }, 2000);
    coins[1]-=2;
}
function computerBuildACastle(x, y) {
    map[x][y]+=2; //Sto je dosad bilo(empty field) +2
    var an=[x, y];
    SEQ=[26,27,28,29];
    mapAnimate[an[0]][an[1]]=SEQ;
    setTimeout(function() {
        mapAnimate[an[0]][an[1]]=0;
    }, 2000);
    coins[1]-=3;
}
function computerConquer1(x, y) { //Osvoji prazno
    map[x][y]=7; //Sto je dosad bilo(empty field) +2
    var an=[x, y];
    SEQ=[16,17,18,19];
    mapAnimate[an[0]][an[1]]=SEQ;
    setTimeout(function() {
        mapAnimate[an[0]][an[1]]=0;
    }, 2000);
    coins[1]-=1;
}
function computerConquerGreenField(x, y) {
    map[x][y]=12; //Sto je dosad bilo(empty field) +2
    var an=[x, y];
    SEQ=[16,17,18,19];
    mapAnimate[an[0]][an[1]]=SEQ;
    setTimeout(function() {
        mapAnimate[an[0]][an[1]]=0;
    }, 2000);
    coins[1]-=1;
}
function computerConquer2(x, y) { //Osvoji tuđe
    map[x][y]+=6; //Sto je dosad bilo(empty field) +2
    var an=[x, y];
    SEQ=[16,17,18,19];
    mapAnimate[an[0]][an[1]]=SEQ;
    setTimeout(function() {
        mapAnimate[an[0]][an[1]]=0;
    }, 2000);
    coins[1]-=3; //Nez kolko
}
function computerUpgrade(x, y) {
    map[x][y]=map[x][y]+2;//Ono sto je vec sad +2?
    var an=[x, y];
    SEQ=[21,22,23,24];
    mapAnimate[an[0]][an[1]]=SEQ;
    setTimeout(function() {
        mapAnimate[an[0]][an[1]]=0;
    }, 2000);
    coins[1]-=map[x][y]-7;
}
var computerJunky = [computerBuildAHut, computerBuildACastle, computerUpgrade, computerConquer1, computerConquerGreenField, computerConquer2];
*/