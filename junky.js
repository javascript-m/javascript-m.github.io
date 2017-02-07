/*Game*/
function updateTable() {
    $('#coins1').text(coins[0]);
    $('#coins2').text(coins[1]);
    $('#cNR1').text(houses[0]);
    $('#cNR2').text(houses[1]);
    
    $('#player1').html($("#p1").text());
    $('#player2').html($("#p2").text());
    
    
    if(POTEZ) $('#player2').html($("#p2").text()+"<br /> coins: "+coins[1]);
    else $('#player1').html($("#p1").text()+"<br /> coins: "+coins[0]);
};
function done(i, z) {
    coins[POTEZ]-=price[i][z];
    opAt.x=-1; opAt.y=-1;
    updateTable();
    $('#gameMenu').hide();
};
function disMessage() {
    $("#gameMenu p").remove();
    $("<p>").addClass("message").appendTo("#gameMenu").text("You don't have enough coins to do this!");
};
function imageUrl(fn) {
    return "Sprites/Menu/"+fn+".png";
};
function finished() {
    return (map[0][0]==7 || map[mapSize-1][mapSize-1]==1);
}
var blocks = [
    [4, 5], //Upgrade
    [2, 3], //Build
    [1, [3, 5], 6], //Conquer1 (neprijateljske gradevine)
    [1, 2, 4] //Conquer2
];
var price = [
    [3, 4], //Upgrade
    [2, 3], //Build
    [1, 3, 1], //Conquer1
    [1, 2, 3]
];
var stuff = [
    ["You can't play here.", "You can't do anything on this field."], //Can't 01 %2
    ["upHut", "upCastle", "dUpHut", "dUpCastle"], //Upgrade //23 %2
    ["buHut", "buCastle", "dBuHut", "dBuCastle"], //Build //4
    ["Conquer","dConquer"]
];
function Cant(z, c) {
    if(SP && POTEZ )$("<p>").appendTo("#gameMenu").text("Computer is playing.");
    else $("<p>").appendTo("#gameMenu").text(stuff[0][z]);
};
function Upgrade(z, c) {
    $("<div>").appendTo("#gameMenu").addClass('menuEl');
    var item = $("#gameMenu div:first-child");
    $("<div>").appendTo("#gameMenu div").addClass('coins');
    
    var ind;
    if(z==0) { //It's a hut
        if(c>=3) ind=0;
        else {
            ind=2;
            item.addClass("disabled");
        }
        item.children().text("3");
    } else {
        if(c>=4) ind=1;
        else {
            ind=3;
            item.addClass("disabled");
        }
        item.children().text("4");
    }
    item.css('background-image', 'url('+imageUrl(stuff[1][ind])+')');
    item.click(function() {
        if(item.hasClass('disabled') == false) {
            if(z==0) {
                SEQ=[21,22,23,24];
            } else SEQ=[35,36,37,38];
            map[opAt.y][opAt.x] = blocks[0][z] + POTEZ*6;
            var an=[opAt.x, opAt.y];
            mapAnimate[an[1]][an[0]]=SEQ;
            setTimeout(function() {
                mapAnimate[an[1]][an[0]]=0;
            }, 2000);
            done(0, z);
        } else disMessage();
        return;
    });
};
function Build(z, c) {
    //var imageUrl = "Sprites/Menu/buHut.png";
    $("<div>").appendTo("#gameMenu").addClass('menuEl').addClass('h').css('background-image', 'url('+imageUrl(stuff[2][0])+')');
    $("<div>").appendTo("#gameMenu").addClass('menuEl').addClass('c').css('background-image', 'url('+imageUrl(stuff[2][1])+')');
    
    if(c<2) $("#gameMenu div:nth-child(1)").addClass("disabled").css('background-image', 'url('+imageUrl(stuff[2][2])+')');
    if(c<3) $("#gameMenu div:nth-child(2)").addClass("disabled").css('background-image', 'url('+imageUrl(stuff[2][3])+')');
    
    $("<div>").appendTo("#gameMenu .h").addClass('coins').text("2");
    $("<div>").appendTo("#gameMenu .c").addClass('coins').text("3");
    
    $('#gameMenu').children().click(function() {
        if($(this).hasClass('disabled') == false) {
            if($(this).hasClass('h')) {
                z=0;
                SEQ=[31,32,33,34];
            } 
            else {
                z=1;
                SEQ=[26,27,28,29];
            }
            map[opAt.y][opAt.x] = blocks[1][z]+POTEZ*6;
            var an=[opAt.x, opAt.y];
            mapAnimate[an[1]][an[0]]=SEQ;
            setTimeout(function() {
                mapAnimate[an[1]][an[0]]=0;
            }, 2000);
            done(1, z);
        } else disMessage();
    }); 
};
function Conquer1(z, c) {
    $("<div>").appendTo("#gameMenu").addClass('menuEl');
    var item = $("#gameMenu div:first-child");
    var ind;
    $("<div>").appendTo("#gameMenu div").addClass('coins');
    //Empty || castle || greenField
    if((z==0 && c>=1) || (z==1 && c>=3) || (z==2 && c>=1)) ind=0;
    else {
        ind=1;
        item.addClass("disabled");
    }
    
    if(z==0 || z==2) item.children().text("1");
    else if(z==1) item.children().text("3");
    
    var castle;
    if(map[opAt.y][opAt.x]-!POTEZ*6 == 3) castle=0; //Lvl1 castle
    else castle=1;
    
    item.css('background-image', 'url('+imageUrl(stuff[3][ind])+')');
    item.click(function() {
        if(item.hasClass("disabled")==false) {
            if(z==1) map[opAt.y][opAt.x] = blocks[2][z][castle]+POTEZ*6;
            else {
                if(z==2 && map[opAt.y][opAt.x]-!POTEZ*6 == 6) { //Opponent's gF
                    grF[POTEZ]+=1;
                    if(POTEZ) grF[0]-=1;
                    else grF[1]-=1;
                } else if(z==2) { //Empty gF
                    grF[POTEZ]+=1;
                }
                map[opAt.y][opAt.x] = blocks[2][z]+POTEZ*6;
            }
            SEQ=[16,17,18,19];
            var an=[opAt.x, opAt.y];
            mapAnimate[an[1]][an[0]]=SEQ;
            setTimeout(function() {
                mapAnimate[an[1]][an[0]]=0;
            }, 2000);
            done(2, z);
        } else disMessage();
        return;
    });
};
function Conquer2(z, c) {
    $("<div>").appendTo("#gameMenu").addClass('menuEl');
    var item = $("#gameMenu div:first-child");
    var ind;
    $("<div>").appendTo("#gameMenu div").addClass('coins');
    //Not protected || pr1 || pr2
    if((z==0 && c>=1) || (z==1 && c>=2) || (z==2 && c>=3)) ind=0;
    else {
        ind=1;
        item.addClass("disabled");
    }
    
    if(z==0) item.children().text("1");
    else if(z==1) item.children().text("2");
    else item.children().text("3");
    
    var cur = map[opAt.y][opAt.x]-!POTEZ*6;
    var hut;
    if(cur==2 || cur==4) {
        hut=cur/2;
    } else hut=0;
    
    item.css('background-image', 'url('+imageUrl(stuff[3][ind])+')');
    item.click(function() {
        if(item.hasClass("disabled")==false) {
            map[opAt.y][opAt.x] = blocks[3][hut] + POTEZ*6;
            SEQ=[16,17,18,19];
            map[opAt.y][opAt.x] = blocks[3][hut] + POTEZ*6;
            var an=[opAt.x, opAt.y];
            mapAnimate[an[1]][an[0]]=SEQ;
            setTimeout(function() {
                mapAnimate[an[1]][an[0]]=0;
            }, 2000);
            done(3, z);
        } else disMessage();
        return;
    });
};
var junky = [ //[w<6 -> w//2 else w//3+1][w%SIZE]
    [Cant, Cant], //Can't 01 %2
    [Upgrade, Upgrade], //Upgrade //23 %2
    [Build], //Build //4
    [Conquer1, Conquer1, Conquer1], //Conquer1 //6-8 %3
    [Conquer2, Conquer2, Conquer2] //Conquer2 //9-11 %3
];