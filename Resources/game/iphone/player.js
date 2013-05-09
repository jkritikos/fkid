
Titanium.Media.audioSessionMode = Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;

var audioPlayer = Ti.Media.createAudioPlayer({ 
    url: 'http://80.237.158.95:8011/stream',
    allowBackground: true
});

var viewPlayer = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'player/background.jpg',
	bottom:65
});

var playerPlayButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/play.png',
	top:145,
	enabled:false
});

viewPlayer.add(playerPlayButton);
playerPlayButton.addEventListener('click', playButton);     

var playerLogo = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/logo.png',
	top:15
});
viewPlayer.add(playerLogo);

var infoButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/button_info_a.png',
	left:0,
	top:0
});
viewPlayer.add(infoButton);
infoButton.addEventListener('click', infoButtonEvent); 

var noInternetBar = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/error_bar.png',
	bottom:25
});
viewPlayer.add(noInternetBar);

var noInternetLabel = Ti.UI.createLabel({
	text:'Φαίνεται να μην είσαι συνδεδεμένος στο Internet.. Συνδέσου και δοκίμασε ξανά!',
	color:'white',
	width:280,
	textAlign:'center',
	font:{fontSize:13, fontFamily:'Helvetica'}
});
noInternetBar.add(noInternetLabel);

win.add(viewPlayer);


function playButton(){
	
	if (audioPlayer.playing || audioPlayer.paused){
        audioPlayer.stop();
        playerPlayButton.enabled = false; 
        playerPlayButton.image = IMAGE_PATH+'player/play.png';
    }else{
        audioPlayer.start();
        playerPlayButton.enabled = true;
        playerPlayButton.image = IMAGE_PATH+'player/pause.png';
    }
		
}

function infoButtonEvent(){
	Ti.include(TYPE_PATH+'info.js');
}
