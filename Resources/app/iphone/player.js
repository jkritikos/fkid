//play in background
Titanium.Media.audioSessionMode = Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;

var playerNoInternetBar = null;

//audioplayer
var audioPlayer = Ti.Media.createAudioPlayer({ 
    url: 'http://80.237.158.95:8011/stream',
    allowBackground: true
});

//player view
var viewPlayer = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'player/background.jpg',
	bottom:65,
	opacity:0
});

//play button
var playerPlayButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/play.png',
	top:145,
	width:167,
	height:167
});

viewPlayer.add(playerPlayButton);
playerPlayButton.addEventListener('click', playButton); 

//application logo
var playerLogo = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/logo.png',
	top:15
});
viewPlayer.add(playerLogo);

playerNoInternetBar = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/error_bar.png',
	bottom:35
});
viewPlayer.add(playerNoInternetBar);

var noInternetLabel = Ti.UI.createLabel({
	text:MSG_NO_INTERNET,
	color:'white',
	width:280,
	textAlign:'center',
	font:{fontSize:13, fontFamily:'Helvetica'}
});
playerNoInternetBar.add(noInternetLabel);

//info button
var playerInfoButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/button_info_a.png',
	left:0,
	width:54,
	height:51,
	top:0
});
viewPlayer.add(playerInfoButton);
playerInfoButton.addEventListener('click', handlePlayerInfoButton); 

//check if user is online - if not show error message
checkPlayerInternet();

//activity Indicator
var activityIndicator = Ti.UI.createActivityIndicator({
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
});
playerPlayButton.add(activityIndicator);
activityIndicator.hide();

win.add(viewPlayer);

//event for the state of the audio player
audioPlayer.addEventListener('change', audioPlayerState);

//event for the progress of the audio player
audioPlayer.addEventListener('progress', audioPlayerProgress);

//handles the play button
function playButton(){
	
	if(Titanium.Network.online == true){
		if (audioPlayer.playing){
	        audioPlayer.pause();
	    }else if(audioPlayer.paused){
	    	audioPlayer.start();
	    }else{
	    	audioPlayer.start();
	    }
	}	
}


function audioPlayerProgress(e) {
    Ti.API.info('Time Played: ' + Math.round(e.progress) + ' milliseconds');
}

function audioPlayerState(e){
	Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
	
	//4:playing - 8:paused - 7:stopped - 2:waiting_for_data
	
	if(e.state == 4){
		playerPlayButton.backgroundImage = IMAGE_PATH+'player/pause.png';
		activityIndicator.hide();
	}else if(e.state == 8 || e.state == 7){
		playerPlayButton.backgroundImage = IMAGE_PATH+'player/play.png';
		activityIndicator.hide();
	}else if(e.state == 2){
		playerPlayButton.backgroundImage = IMAGE_PATH+'player/play_plain.png';
		activityIndicator.show();
	}
}


//handles info button and directs to info.js
function handlePlayerInfoButton(){
	playerTabSelected.hide();
	
	viewPlayer.animate(anim_out);
	viewInfo.animate(anim_in);
}

function checkPlayerInternet(){
	if(!Titanium.Network.online){
		playerNoInternetBar.show();
		audioPlayer.stop();
		playerPlayButton.backgroundImage = IMAGE_PATH+'player/play.png';
	}else{
		playerNoInternetBar.hide();
	}
}
