var interval, round;
function coinCount() {
    coins[0] = 3+Math.floor(houses[0]/3);
    coins[1] = 3+Math.floor(houses[1]/3);
    
    var gF = [[8,0],[4,4],[0,8]];
    
    if(round) coins[1]+=1;
    round=0;
    
    for(var i=0; i<3; i++) {
        if(map[gF[i][1]][gF[i][0]] == 6) coins[0]++;
        else if(map[gF[i][1]][gF[i][0]] == 12) coins[1]++;
    }
    updateTable();
}
function whoIsPlaying(w) {
    var pName;
    if(!w) pName = $("#p1").text();
    else pName = $("#p2").text();
    $("#wip").text(pName+" is playing.");
}
function InitializeGame() {
    coins = [3,4];
    houses = [0,0];
    /*Prima parametar je li SP ili MP*/
    $('#navBar').show();
    var xPos=0; var yPos=0;
    updateTable();
    whoIsPlaying(POTEZ);
    /*Define a map*/
    map = [ [1,0,0,0,0,0,0,0,13],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,13,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [13,0,0,0,0,0,0,0,7] ];
    
    var TIME = {
        t: 60,
        track: 0
    }
    
    round=1;
    
    Mouse();
    interval = setInterval(function() {
        DrawMap();
        MouseH();
        
        //Timer
        TIME = TrackTime(TIME.t, TIME.track);
        $('#time').text('Time: '+TIME.t);
        
        if(coins[POTEZ]==0 || TIME.t<=0) {
            TIME.t = 60;
            TIME.track = 0;
            POTEZ=!POTEZ;
            whoIsPlaying(POTEZ);
            if(POTEZ) POTEZ=1;
            else POTEZ=0;
            
            coinCount();
        }
    }, 50);
    
    function finished() {
        return (map[0][0]==6 || map[8][8]==1);
    }
}
function goodName(p1, p2) {
    if(p1.length > 0 && p2.length > 0) return true;
    else {
        $('#message').text('Please enter some valid names.');
        return false;
    }
}
function stickNames(p1, p2) {
    $('#p1').text(p1);
    $('#p2').text(p2);
}
function GameStart() {
    clearInterval(interval);
    
    $('#playerMode').hide();
    $('#playerNames').hide();
    $('#navBar').hide();
    $('#gameMenu').hide();
    $('#startMenu').show();
    
    //window.clearInterval(interval);
    var ctx = game.getContext('2d');
    
    ctx.beginPath();
    ctx.rect(0, 0, SIZE, SIZE);
    ctx.fillStyle='rgba(119, 132, 153, 0.8)';
    ctx.fill();
    
    var offset = $('#game').offset();
    /*Start Menu*/
    var startMenu = $('#startMenu');
    var smPos = {
        left: offset.left + (SIZE-startMenu.width())/2, //(540 - itsWIdth)/2
        top: offset.top + (SIZE-startMenu.height())/2
    }
    $('#startMenu').css(smPos);
    $('#startMenu div:first-child').click(function() {
        $('#startMenu').hide();
        $('#playerMode').show();
    });
    /*Player Mode*/
    var playerMode = $('#playerMode');
    var pPos = {
        left: offset.left + (SIZE-playerMode.width())/2, //(540 - itsWIdth)/2
        top: offset.top + (SIZE-50-playerMode.height())/2
    }
    $('#playerMode').css(pPos);
    $('#playerMode .pNum').click(function() {
        /*Hide startMenu*/
        $('.pNum').removeClass('active');
        $(this).addClass('active');
    });
    $('#playerMode div:last-child').click(function() {
        $('#playerMode').hide();
        $('#playerNames').show();
    });
    /*EnterNames*/
    playerNames=$('#playerNames');
    var pnPos = {
        left: offset.left + (SIZE-playerNames.width())/2,
        top: offset.top + (SIZE-playerNames.height())/2
    }
    $('#playerNames').css(pnPos);
    $('#playerNames div:last-child').click(function() {
        var p1=document.getElementById('pOne').value;
        var p2=document.getElementById('pTwo').value;
        if(goodName(p1,p2)) {
            stickNames(p1,p2);
            $('#playerNames').hide();
            clearInterval(interval);
            InitializeGame();
        }
    });
}