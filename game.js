var smX = [0,1,0,-1,0];
var smY = [-1,0,1,0,0]
/*GLAVNI ALGORITAM*/
//U MAPU SVE OBRNUTO (y pa x)
function computerThinks(x, y) {
    return 0;
}
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
function computerMove() {
    //Fja koja vraca niz parova tj niz poteza koje komp mora odigrat // xPos, yPos
    var KOMB_COUNT=0;
    var vrPloce;
    var mapa="0000000000000000000000000000000000000000000000000000000000000000"; //Dodaj u mapu
    var posjed="0000000000000000000000000000000000000000000000000000000000000000";
    var potez=new Array();
    var result=new Array();
    result[0]=-1;
    var money=coins[1];
    function updateMapPotez() {
        for(var i=0; i<8; i++) {
            for(var j=0; j<8; j++) {
                if(map[i][j]==1) {
                    mapa = mapa.replaceAt(8*i+j, "1");
                    posjed = posjed.replaceAt(8*i+j, "2");
                } else if(map[i][j]==2) {
                    mapa = mapa.replaceAt(8*i+j, "2");
                    posjed = posjed.replaceAt(8*i+j, "2");
                } else if(map[i][j]==3) {
                    mapa = mapa.replaceAt(8*i+j, "3");
                    posjed = posjed.replaceAt(8*i+j, "2");
                } else if(map[i][j]==4) {
                    mapa = mapa.replaceAt(8*i+j, "4");
                    posjed = posjed.replaceAt(8*i+j, "2");
                } else if(map[i][j]==5) {
                    mapa = mapa.replaceAt(8*i+j, "5");
                    posjed = posjed.replaceAt(8*i+j, "2");
                } else if(map[i][j]==6) {
                    mapa = mapa.replaceAt(8*i+j, "6");
                    posjed = posjed.replaceAt(8*i+j, "2");
                } else if(map[i][j]==7) {
                    mapa = mapa.replaceAt(8*i+j, "7");
                    posjed = posjed.replaceAt(8*i+j, "1");
                } else if(map[i][j]==8) {
                    mapa = mapa.replaceAt(8*i+j, "8");
                    posjed = posjed.replaceAt(8*i+j, "1");
                } else if(map[i][j]==9) {
                    mapa = mapa.replaceAt(8*i+j, "9");
                    posjed = posjed.replaceAt(8*i+j, "1");
                } else if(map[i][j]==10) {
                    mapa = mapa.replaceAt(8*i+j, "e");
                    posjed = posjed.replaceAt(8*i+j, "1");
                } else if(map[i][j]==11) {
                    mapa = mapa.replaceAt(8*i+j, "f");
                    posjed = posjed.replaceAt(8*i+j, "1");
                } else if(map[i][j]==12) {
                    mapa = mapa.replaceAt(8*i+j, "g");
                    posjed = posjed.replaceAt(8*i+j, "1");
                } else if(map[i][j]==13) {
                    mapa = mapa.replaceAt(8*i+j, "h");
                    posjed = posjed.replaceAt(8*i+j, "0");
                }
            }
        }
    }
    updateMapPotez();
    function value(mapx) { //Uzima mapu i vraca vrijednost (dogovorenu)
        /*JAKO JE VAŽNO DA GRAĐEVINE KOJE SU BLIŽE PALAČAMA IMAJU VEĆU VRIJEDNOST*/
        var val=0;
        if(mapx[0]=='7') val+=10000;
        for(var i=0; i<8; i++) {
            for(var j=0; j<8; j++) {
                //Vrijednosti
                var dist=Math.floor(Math.sqrt(i*i+j*j)); //Udaljenost od palace
                var distGreenFieldL = 7-i+j;
                var distGreenFieldR = i+7-j;
                
                if(i==7 && j==7) continue;
                if(mapx[8*i+j]=='7') { //Osvojio si polje (prazno/tude)
                    val+=Math.floor((1/dist+1)*20);
                    if(map[i][j]==1) val+=100; //Tude --> puno bolje
                }
                else if(mapx[8*i+j]=='g') {
                    val+=150; //Green field
                    if(map[i][j]==6) val+=80; //Tudi gf
                }
                else if(mapx[8*i+j]=='8' || mapx[8*i+j]=='e') { //Kuce -> izgradi kucu
                    val+=dist*(30+Math.random()*10); //30-40
                    if(mapx[8*i+j]=='e') val+=20;
                    if(map[i][j]==2 || map[i][j]==4) val+=100; //Osvoji tude
                
                }
                else if(mapx[8*i+j]=='9' || mapx[8*i+j]=='f') {
                    //Ako je blizu mog ili blizu tudeg
                    val+=dist*(40+Math.random()*20); //Dvorac1 (40-60)
                    if(dist<=2) val+=150;
                    if(mapx[8*i+j]=='f') val+=30; //Lvl 2 dvorac
                }
                
                //Polje vise vrijedi ako je zasticeno dvorcem
                if(posjed[i][j]=='1') {
                    for(var m=0; m<8; m++) {
                        if(insideBoard(i+casSmX[m],j+casSmY[m]) && (map[i][j]==2 || map[i][j]==4)) {
                            val+=100;
                        }
                    }
                }
                //Polje vrijedi vise ako je blize gF
                val+=Math.floor(1/1+Math.min(distGreenFieldL,distGreenFieldR)*7); //Ako je blize gF, vise vrijedi
            }
        }
        return val;
    }
    function osvojioSi(l) {
        if(l=='1') return '7';
        else if(l=='2') return '8';
        else if(l=='3') return '9';
        else if(l=='4') return 'e';
        else if(l=='5') return 'f';
        else if(l=='6') return 'g';
    }
    function defended(gP, mapx) {
        //Vidi je li zasticeno
        var dod=0;
        par = new Array();
        par[0]=Math.floor(gP[0]-'0');
        par[1]=Math.floor(gP[1]-'0');
        if(mapx[8*par[0]+par[1]]=='6') return 0; //Dvorci ne stite zelena polja
        else if(mapx[8*par[0]+par[1]]=='3' || mapx[8*par[0]+par[1]]=='5') {
            return 2; //Polje je dvorac
        } else { //Je li zasticeno?
            for(var i=0; i<8; i++) {
                if(insideBoard(par[0]+casSmX[i], par[1]+casSmY[i])) {
                    if(mapx[8*(par[0]+casSmX[i])+par[1]+casSmY[i]]=='3' && dod<1) dod=1;
                    else if(mapx[8*(par[0]+casSmX[i])+par[1]+casSmY[i]]=='5') dod=2;
                }
            }
            return dod;
        }
    }
    var solution = new Array();
    function rek(mapx, coins, pot) {
        var playedAnything=false;
        if(KOMB_COUNT >= 1000) return 0;
        if(coins<=0) {
            KOMB_COUNT+=1;
            vrPloce=value(mapx);
            if(vrPloce >= result[0]) {
                result[0] = vrPloce;
                result[1] = pot;
                solution = [];
                for(var i=0; i<result[1].length; i++) {
                    solution[i]=result[1][i];
                }
            }
            return 0;
        } else {
            //Gledaj sve poteze di mozes igrat i za svaki potez pozovi rekurziju
            for(var i=0; i<8; i++) {
                for(var j=0; j<8; j++) {
                    if(i==7 && j==7) continue; //Ne moze igrati na svojoj palaci
                    var z=0;
                    for(var k=0; k<4; k++) {
                        if(insideBoard(i+smX[k], j+smY[k]) && posjed[(i+smX[k])*8+j+smY[k]]=='1') z=1;
                    }
                    //Ako mogu igrati ovdje
                    if(z) { //Pronašla sam mogući potez -> izračunaj mu vrijednost -> dodaj ga u rek
                        var goodPos="";
                        goodPos+=i;
                        goodPos+=j;
                        
                        if(posjed[8*i+j]=='2') {
                            //Tuđe polje
                            var dod=defended(goodPos, mapx)+1; //Ako je zaštićena, treba još novaca
                            var temp = mapx[8*i+j];
                            if(coins >= dod) { //Imam dovoljno novaca za osvajanje
                                mapx = mapx.replaceAt(8*i+j, osvojioSi(temp));
                                posjed = posjed.replaceAt(8*i+j, "1");
                                pot[pot.length]=goodPos+"6";
                                rek(mapx,coins-dod,pot);
                                pot.pop();
                                posjed = posjed.replaceAt(8*i+j, "2"); //Vrati da je tude
                                mapx = mapx.replaceAt(8*i+j, temp); //Vrati na ono sto je bilo prije
                                playedAnything=true;
                            }
                        } else if(posjed[8*i+j]=='1') { //Moje polje
                            if(!(mapx[8*i+j]=='e' || mapx[8*i+j]=='f')) { //Nije upgradeana zgrada
                                if(coins>=2 && mapx[8*i+j]=='7') { //Gradi kucu
                                    mapx = mapx.replaceAt(8*i+j, "8"); //Hut pl2
                                    pot[pot.length]=goodPos+"2";
                                    rek(mapx,coins-2,pot);
                                    pot.pop();
                                    mapx = mapx.replaceAt(8*i+j, "7"); //Hut pl2 (prije je bilo osvojeno polje)
                                    playedAnything=true;
                                }
                                if(coins>=3 && mapx[8*i+j]=='7') { //Gradi dvorac
                                    mapx = mapx.replaceAt(8*i+j, "9"); //Castle pl2
                                    pot[pot.length]=goodPos+"3";
                                    rek(mapx,coins-3,pot);
                                    pot.pop();
                                    mapx = mapx.replaceAt(8*i+j, "7"); //Hut pl2 (prije je bilo osvojeno polje)
                                    playedAnything=true;
                                }
                                if(coins>=3 && mapx[8*i+j]=='8') { //Upgrade kuca
                                    mapx = mapx.replaceAt(8*i+j, "e"); //Hut lvl2
                                    pot[pot.length]=goodPos+"4";
                                    rek(mapx,coins-3,pot);
                                    pot.pop();
                                    mapx = mapx.replaceAt(8*i+j, "8");
                                    playedAnything=true;
                                }
                                if(coins>=4 && mapx[8*i+j]=='9') { //Upgrade dvorac
                                    mapx = mapx.replaceAt(8*i+j, "f"); //Castle lvl2
                                    pot[pot.length]=goodPos+"5";
                                    rek(mapx,coins-4,pot);
                                    pot.pop();
                                    mapx = mapx.replaceAt(8*i+j, "9");
                                    playedAnything=true;
                                }
                            }
                        } else if (coins>=1) { //Nicije polje -> empty or mine (sig ima 1 kn)
                            var temp = mapx[8*i+j];
                            if(temp=='0') {
                                mapx = mapx.replaceAt(8*i+j, "7"); //Neosvojeno
                                pot[pot.length]=goodPos+"0";
                            } else {
                                mapx = mapx.replaceAt(8*i+j, "h"); //Mine
                                pot[pot.length]=goodPos+"1";
                            }
                            posjed = posjed.replaceAt(8*i+j, '1'); //This
                            rek(mapx,coins-1,pot);
                            pot.pop();
                            posjed = posjed.replaceAt(8*i+j, "0");
                            mapx = mapx.replaceAt(8*i+j, temp); //Vrati na ono sto je bilo prije
                            playedAnything=true;
                        }
                    }
                }
            }
        }

        if(!playedAnything) rek(mapx, 0, pot);
    }
    rek(mapa, money, potez);
    var arr = new Array();
    var pomocni = new Array();
    
    for(var i=0; i<solution.length; i++) {
        pomocni = [];
        for(var j=0; j<3; j++) {
            pomocni[j]=solution[i][j]-'0';
        } arr[i]=pomocni;
    }
    return arr;
}
function whatCanIDo(x, y) {
    var nothing=true;
    
    for(var i=0; i<5; i++) { //Za svaki od 4 okolna polja
        if(insideBoard(y+smY[i], x+smX[i])) {
            for(var j=1; j<=6; j++) { //Vidi je li tvoje polje
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
        10-hutUp p2 e
        11-castleUp p2 f
        12-gf p2 g
        13-gf noOne h
    */
}
var times=0;
function DelayLoop (w) { 
    setTimeout(function () {
        computerPlays(w[times][0],w[times][1],w[times][2]);
        //computerJunky[w[times][2]](w[times][0],w[times][1]);
        updateTable();
        times++;
        if (times < w.length) {
            DelayLoop(w);
        }
   }, 1000);
}
function putInMenu(w) {
    var index=0;
    if($.isNumeric(w)) {
        if(w >= 6) index=Math.floor(w/3)+1;
        else index=Math.floor(w/2);
        var s = junky[index].length;
    }
    $("#gameMenu").children().remove();
    
    var c = coins[POTEZ];
    
    if(SP && POTEZ) {
        times=0;
        DelayLoop(w);
    } else junky[index][w%s](w%s, c);
}