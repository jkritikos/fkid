
var win = Titanium.UI.createWindow({  
    title:'Audio Test',
    backgroundColor:'#fff',
    layout: 'vertical'
});

var startStopButton = Titanium.UI.createButton({
    title:'Start/Stop Streaming',
    top:10,
    width:200,
    height:40
});

var pauseResumeButton = Titanium.UI.createButton({
    title:'Pause/Resume Streaming',
    top:10,
    width:200,
    height:40,
    enabled:false
});

win.add(startStopButton);
win.add(pauseResumeButton);

Titanium.Media.audioSessionMode = Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;

// allowBackground: true on Android allows the 
// player to keep playing when the app is in the 
// background.
var audioPlayer = Ti.Media.createAudioPlayer({ 
    //url: 'http://80.237.158.95:8010/stream',
    url:'http://80.237.158.95:8011/stream',
    allowBackground: true
});     

    
    
startStopButton.addEventListener('click',function() {
    // When paused, playing returns false.
    // If both are false, playback is stopped.
    if (audioPlayer.playing || audioPlayer.paused)
    {
        audioPlayer.stop();
        pauseResumeButton.enabled = false; 
    }
    else
    {
        audioPlayer.start();
        pauseResumeButton.enabled = true;
    }
});

pauseResumeButton.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.start();
    }
    else {
        audioPlayer.pause();
    }
});

audioPlayer.addEventListener('progress',function(e) {
    Ti.API.info('Time Played: ' + Math.round(e.progress) + ' milliseconds');
});

audioPlayer.addEventListener('change',function(e)
{
    Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
});

win.addEventListener('close',function() {
    audioPlayer.stop();
    
});

win.open();