function drawSq(x, y, lineW) {
    var context = game.getContext('2d');
    context.beginPath();
    context.rect(x*BLOCK, y*BLOCK, BLOCK, BLOCK);
    context.strokeStyle="black";
    context.lineWidth=lineW;
    context.stroke();
}
var opAt = {
    x: -1,
    y: -1
}
function showMenu(x, y, show) {
    var offset = $('#game').offset();
    var cPos = {
        left: offset.left + x*BLOCK + 20,
        top: offset.top + y*BLOCK - 50
    }
    $("#gameMenu").css(cPos);
    $("#gameMenu").children().remove();
    
    if(show) {
        if(SP==1 && POTEZ==1){
            putInMenu(computerThinks(x, y));
        } else {
            var ajmoVidit = whatCanIDo(x, y);
            putInMenu(ajmoVidit);
        }
        $('#gameMenu').show();
    }
    else {
        opAt.x=-1; opAt.y=-1;
        $('#gameMenu').hide();
    }
}
/*For EVENT LISTENERS*/
function getMousePos(evt) {
    var rect = game.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
}
function mM (event) {
    var mousePos = getMousePos(event);
    xPos = Math.floor(mousePos.x/BLOCK);
    yPos = Math.floor(mousePos.y/BLOCK);
}
function cK () {
    if(insideBoard(xPos, yPos)) {
        var show = 1;
        if(opAt.x == xPos && opAt.y == yPos) show=0;
        opAt.x = xPos; opAt.y = yPos;
        showMenu(xPos, yPos, show);
    }
}
/*MOUSE FUNCTIONS*/
function Mouse() {
    /*Event listeneri za gumbe*/
    game.addEventListener('mousemove', mM, false);
    game.addEventListener('click', cK, false);
    
}
function RemoveEventListeners() {
    game.removeEventListener('mousemove', mM,false);
    game.removeEventListener('click',cK, false);
    xPos=0; yPos=0;
}
function MouseH() { //For mouse hover and click
    if(insideBoard(xPos, yPos)) { //Hover
        drawSq(xPos, yPos, 1);
    }
    drawSq(opAt.x, opAt.y, 3); //Click
}