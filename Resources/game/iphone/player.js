//play in background
Titanium.Media.audioSessionMode = Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;

//audioplayer
var audioPlayer = Ti.Media.createAudioPlayer({ 
    url: 'http://80.237.158.95:8011/stream',
    allowBackground: true
});

//player view
var viewPlayer = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'player/background.jpg',
	bottom:65
});

//play button
var playerPlayButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/play.png',
	top:145,
	width:167,
	height:167,
	active:false
});

viewPlayer.add(playerPlayButton);
playerPlayButton.addEventListener('click', playButton); 

//application logo
var playerLogo = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/logo.png',
	top:15
});
viewPlayer.add(playerLogo);

//info button
var infoButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/button_info_a.png',
	left:0,
	width:54,
	height:51,
	top:0
});
viewPlayer.add(infoButton);
infoButton.addEventListener('click', handleInfoButton); 

//check if user is online - if not show error message
if(!Titanium.Network.online){
	var noInternetBar = Ti.UI.createImageView({
		image:IMAGE_PATH+'player/error_bar.png',
		bottom:35
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
}

win.add(viewPlayer);

//handles the play button
function playButton(){
	if (audioPlayer.playing){
        audioPlayer.stop();
        playerPlayButton.active = false; 
        playerPlayButton.backgroundImage = IMAGE_PATH+'player/play.png';
    }else{
        audioPlayer.start();
        playerPlayButton.active = true;
        playerPlayButton.backgroundImage = IMAGE_PATH+'player/pause.png';
    }
		
}

//handles info button and directs to info.js
function handleInfoButton(){
	Ti.include(TYPE_PATH+'info.js');
}