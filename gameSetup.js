var interval, round;
function coinCount() {
    coins[0] = 3+Math.floor(houses[0]/3);
    coins[1] = 3+Math.floor(houses[1]/3);
    
    coins[0]+=grF[0];
    coins[1]+=grF[1];
    
    if(round) coins[1]+=1;
    round=0;
    
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
        
    if(POTEZ) $('#gameOver #whoWon').text($("#navBar #plCont div:nth-child(3)").text()+" won!");
    else $('#gameOver #whoWon').text($("#navBar #plCont div:nth-child(1)").text()+" won!");
    $('#gameOver').show();

    $('#gameOver div:last-child').click(function() {
        RemoveEventListeners();
        GameStart();
    });
};
function InitializeGame() {
    POTEZ=0;
    coins[0]=3;
    coins[1]=4;
    houses = [0,0];
    /*Prima parametar je li SP ili MP*/
    $('#navBar').show();
    var xPos=0; var yPos=0;
    updateTable();
    whoIsPlaying(POTEZ);
    /*Define a map*/
    map = [ [1,0,0,0,0,0,0,13],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,9],
            [13,0,0,0,0,0,0,7]  ];
    
    mapAnimate = [  [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0] ];
    var TIME = {
        t: 60,
        track: 0
    }
    
    round=1;
    Mouse();
    
    coinCount();
    interval = setInterval(function() {
        DrawMap();
        ResetAnimationCounter();
        
        MouseH();
        if(finished()) gameOver(); //Fja finished definirana u junky.js
        //Timer
        TIME = TrackTime(TIME.t, TIME.track);
        $('#time').text('Time: '+TIME.t);
        
        if(coins[POTEZ]==0 || TIME.t<=0) {
            TIME.t = 60;
            TIME.track = 0;
            if(POTEZ) POTEZ=0;
            else POTEZ=1;
            
            whoIsPlaying(POTEZ);
            
            if(POTEZ==0) coinCount();
        }
    }, 50);
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
    $('#plCont div:nth-child(1)').text(p1);
    $('#plCont div:nth-child(3)').text(p2);
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
    
    $('#startMenu div:first-child').click(function() {
        $('#startMenu').hide();
        $('#playerNames').show();
    });
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
    //Enter Names
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
    /*The Rules*/
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
    $('#exit').click(function() {
        RemoveEventListeners();
        clearInterval(interval);
        opAt.x=-1; opAt.y=-1;
        $('#startMenu').show();
        GameStart();
    });
}