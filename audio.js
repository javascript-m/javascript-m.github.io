function RunAudio() {
    var audio = new Audio();
    audio.src = "Music/Background.mp3";
    audio.loop = true;
    
    audio.play();
    
    playbtn.addEventListener("click", playPause);
    volumebar.addEventListener("mousemove", setVolume);
    
    function playPause() {
        if(audio.paused) {
            audio.play();
            $("#playbtn").css('background-image','url(Music/Bg/speaker.png)');
        } else {
            audio.pause();
            $("#playbtn").css('background-image','url(Music/Bg/speakerMuted.png)');
        }
    }
    function setVolume() {
        audio.volume = volumebar.value / 100;
    }
}