var interval, roundOne;
function coinCount(pot) {
    coins[pot]=3+Math.floor(houses[pot]/3)+grF[pot];

    updateTable();
};
function whoIsPlaying(w) {
    $("#plCont").children().css('background-color', 'transparent').css('font-weight', 'normal');
    if(!w) $("#plCont div:nth-child(1)").css('background-color', '#b70000').css('font-weight', 'bolder');
    else $("#plCont div:nth-child(3)").css('background-color', '#0006b7').css('font-weight', 'bolder');
};
function gameOver() {
    //Sve isto kao kad kliknes settings
    RemoveEventListeners();
    clearInterval(interval);
    opAt.x=-1; opAt.y=-1;
        
    if(map[mapSize-1][mapSize-1]==1) $('#gameOver #whoWon').text($("#p1").text()+" won!");
    else $('#gameOver #whoWon').text($("#p2").text()+" won!");
    
    $('#gameOver').show();
    $('#gameOver div:last-child').click(function() {
        RemoveEventListeners();
        GameStart();
    });
};
var TIME = { //For timer
    t: 60,
    track: 0
}
function twoPlayers() {
    interval = setInterval(function() {
        ResetAnimationCounter();
        DrawMap();
        MouseH();
        if(finished()) gameOver(); //Fja finished definirana u junky.js
        //Timer
        TIME = TrackTime(TIME.t, TIME.track);
        $('#time').text('Time: '+TIME.t);
        
        if(coins[POTEZ]<=0 || TIME.t<=0) {
            TIME.t = 60;
            TIME.track = 0;
            if(POTEZ) POTEZ=0;
            else POTEZ=1;
            
            if(!roundOne) coinCount(POTEZ);
            else updateTable();
            
            if(POTEZ) roundOne=0;
            whoIsPlaying(POTEZ);
            
            //Sluzi za obnovit menu kod promjene poteza
            putInMenu(whatCanIDo(opAt.x, opAt.y));
        }
    }, 50);
}
function onePlayer() {
    interval = setInterval(function() {
        ResetAnimationCounter();
        DrawMap();
        MouseH();
        if(finished()) gameOver(); //Fja finished definirana u junky.js
        //Timer
        TIME = TrackTime(TIME.t, TIME.track);
        $('#time').text('Time: '+TIME.t);
        
        if(coins[POTEZ]<=0 || TIME.t<=0) {
            TIME.t = 60;
            TIME.track = 0;
            if(POTEZ) POTEZ=0;
            else POTEZ=1;
            if(!roundOne) coinCount(POTEZ);
            else updateTable();
            
            if(POTEZ) roundOne=0;
            whoIsPlaying(POTEZ);
            
            //Sluzi za obnovit menu kod promjene poteza
            if(!POTEZ) putInMenu(whatCanIDo(opAt.x, opAt.y));
            else putInMenu(computerMove());
        }
    }, 50);
    
}
function InitializeGame() {
    roundOne=1;
    POTEZ=0;
    coins[0]=3;
    coins[1]=4;
    houses = [0,0];
    grF=[0,0];
    TIME.t=60;
    TIME.track=0;
    /*Prima parametar je li SP ili MP*/
    $('#navBar').show();
    xPos=0; yPos=0;
    updateTable();
    whoIsPlaying(POTEZ);
    
    /*Definiraj mapu*/
    map = [ [1,0,0,0,0,0,0,13],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [13,0,0,0,0,0,0,7]  ];
    
    
    mapAnimate = [  [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]  ];
    Mouse();
    //onePlayer();
    SP=0;
    twoPlayers();
}
function goodName(p1, p2) {
    if(p1==p2) {
        $('#message').text('You must enter different names.');
        return false;
    }
    else if(p1.length > 0 && p2.length > 0) return true;
    else {
        $('#message').text('Please enter some valid names.');
        return false;
    }
}
function stickNames(p1, p2) {
    $('#p1').text(p1);
    $('#p2').text(p2);
    $('#plCont div:nth-child(1)').text(p1);
    $('#plCont div:nth-child(3)').text(p2);
}
function Clicked() {
    $('#startMenu div:first-child').click(function() {
        $('#startMenu').hide();
        $('#playerNames').show();
    });
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
    $('#startMenu div:nth-child(2)').click(function() {
       $('#theRules').show(); 
    });
    $('#theRules div:nth-child(7)').click(function() {
        $('#startMenu').hide();
        $('#theRules').hide();
        $('#playerNames').show();
    });
    /*Settings*/
    $('.settings').click(function() {
        $('#settings').show();
    });
    $('#settings div div:last-child').click(function() {
        $('#settings').hide();
    });
    /*Exit*/
    $('#exit').click(function() {
        RemoveEventListeners();
        clearInterval(interval);
        opAt.x=-1; opAt.y=-1;
        $('#startMenu').show();
        GameStart();
    });
    $('#surrender').click(function() {
        $("#areYouSure").show();
    });
    $('#areYouSure div:nth-child(2)').click(function() {
       //Surrender! 
        map[POTEZ*7][POTEZ*7]=1+!POTEZ*6;
        $("#areYouSure").hide();
        gameOver();
    });
    $('#areYouSure div:nth-child(3)').click(function() {
       $("#areYouSure").hide();
    });
    $('#pass').click(function() {
        TIME.t=0;
        TIME.track=0;
        $("#gameMenu").hide();
    });
}
function GameStart() {
    clearInterval(interval);
    
    $('#playerMode').hide();
    $('#playerNames').hide();
    $('#navBar').hide();
    $('#gameMenu').hide();
    $('#gameOver').hide();
    $('#theRules').hide();
    $('#settings').hide();
    $('#startMenu').show();
    
    
    /*Player Mode*/
    /*
    $('#playerMode .pNum').click(function() {
        $('.pNum').removeClass('active');
        $(this).addClass('active');
    });
    $('#playerMode div:last-child').click(function() {
        $('#playerMode').hide();
        $('#playerNames').show();
    });*/  
}