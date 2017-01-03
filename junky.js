/*Game*/
function updateTable() {
    $('#coins1').text(coins[0]);
    $('#coins2').text(coins[1]);
    $('#cNR1').text(houses[0]);
    $('#cNR2').text(houses[1]);
}
function done(i, z) {
    coins[POTEZ]-=price[i][z];
    opAt.x=-1; opAt.y=-1;
    updateTable();
    $('#gameMenu').hide();
};
function disMessage() {
    $("#gameMenu p").remove();
    $("<p>").addClass("message").appendTo("#gameMenu").text("You don't have enough money to do this!");
};
function imageUrl(fn) {
    return "Sprites/Menu/"+fn+".png";
};
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
    $("<p>").appendTo("#gameMenu").text(stuff[0][z]);
};
function Upgrade(z, c) {
    $("<div>").appendTo("#gameMenu");
    var item = $("#gameMenu div:first-child");
    var ind;
    if(z==0) { //It's a hut
        if(c>=3) ind=0;
        else {
            ind=2;
            item.addClass("disabled");
        }
    } else {
        if(c>=4) ind=1;
        else {
            ind=3;
            item.addClass("disabled");
        }
    }
    item.css('background-image', 'url('+imageUrl(stuff[1][ind])+')');

    item.click(function() {
        if(item.hasClass('disabled') == false) {
            if(z==0) houses[POTEZ]+=1;
            map[opAt.y][opAt.x] = blocks[0][z] + POTEZ*6;
            done(0, z);
        } else disMessage();
        return;
    });
};
function Build(z, c) {
    //var imageUrl = "Sprites/Menu/buHut.png";
    $("<div>").appendTo("#gameMenu").addClass('h').css('background-image', 'url('+imageUrl(stuff[2][0])+')');
    $("<div>").appendTo("#gameMenu").addClass('c').css('background-image', 'url('+imageUrl(stuff[2][1])+')');
    
    if(c<2) $("#gameMenu div:nth-child(1)").addClass("disabled").css('background-image', 'url('+imageUrl(stuff[2][2])+')');
    if(c<3) $("#gameMenu div:nth-child(2)").addClass("disabled").css('background-image', 'url('+imageUrl(stuff[2][3])+')');
    
    $('#gameMenu').children().click(function() {
        if($(this).hasClass('disabled') == false) {
            if($(this).hasClass('h')) {
                houses[POTEZ]+=1;
                z=0;
            }
            else z=1;
            map[opAt.y][opAt.x] = blocks[1][z]+POTEZ*6;
            done(1, z);
        } else disMessage();
        return;
    });
};
function Conquer1(z, c) {
    $("<div>").appendTo("#gameMenu");
    var item = $("#gameMenu div:first-child");
    var ind;
    //Empty || castle || greenField
    if((z==0 && c>=1) || (z==1 && c>=3) || (z==2 && c>=1)) ind=0;
    else {
        ind=1;
        item.addClass("disabled");
    }
    
    var castle;
    if(map[opAt.y][opAt.x]-!POTEZ*6 == 3) castle=0; //Lvl1 castle
    else castle=1;
    
    item.css('background-image', 'url('+imageUrl(stuff[3][ind])+')');

    item.click(function() {
        if(item.hasClass("disabled")==false) {
            if(z==1) map[opAt.y][opAt.x] = blocks[2][z][castle]+POTEZ*6;
            else map[opAt.y][opAt.x] = blocks[2][z]+POTEZ*6;
            done(2, z);
        } else disMessage();
        return;
    });
};
function Conquer2(z, c) {
    $("<div>").appendTo("#gameMenu");
    var item = $("#gameMenu div:first-child");
    var ind;
    //Not protected || pr1 || pr2
    if((z==0 && c>=1) || (z==1 && c>=2) || (z==2 && c>=3)) ind=0;
    else {
        ind=1;
        item.addClass("disabled");
    }
    var cur = map[opAt.y][opAt.x]-!POTEZ*6;
    var hut;
    if(cur==2 || cur==4) {
        hut=Math.floor(cur/2);
    } else hut=0;
    
    item.css('background-image', 'url('+imageUrl(stuff[3][ind])+')');

    item.click(function() {
        if(item.hasClass("disabled")==false) {
            map[opAt.y][opAt.x] = blocks[3][hut] + POTEZ*6;
            houses[POTEZ]+=hut;
            houses[!POTEZ]-=hut;
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