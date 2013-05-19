var playerURL = 'http://80.237.158.95:8011/stream';
//var playerURL = 'http://www.ifeelradio.gr/cast/tunein.php/ifeelkiddj/playlist.pls';

//height offset for iphone5
var PLAYER_IPHONE5_OFFSET_HEIGHT = 50;

//play in background
Titanium.Media.audioSessionMode = Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;

var playerNoInternetBar = null;

//audioplayer
var audioPlayer = null;
buildAudioPlayer();

function buildAudioPlayer(){
	audioPlayer = null;
	audioPlayer = Ti.Media.createAudioPlayer({ 
	    url: playerURL
	});
	
	var bufferSize = audioPlayer.getBufferSize();
	Ti.API.info('player bufferSize='+bufferSize);
	
	//event for the state of the audio player
	audioPlayer.addEventListener('change', audioPlayerState);
	
	//event for the progress of the audio player
	audioPlayer.addEventListener('progress', audioPlayerProgress);
}

function destroyAudioPlayer(){
	if(audioPlayer != null){
		audioPlayer.removeEventListener('change', audioPlayerState);
		audioPlayer.removeEventListener('progress', audioPlayerProgress);
		audioPlayer = null;
	}
}

//player view
var viewPlayer = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'player/background.jpg',
	bottom:isIpad ? 146 : 65,
	opacity:0
});

//play button
var playerPlayButtonTop = IPHONE5 ? 145+PLAYER_IPHONE5_OFFSET_HEIGHT : 145;
var playerPlayButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/play.png',
	top:isIpad ? 340 : playerPlayButtonTop,
	width:isIpad ? 364 : 167,
	height:isIpad ? 364 : 167
});

viewPlayer.add(playerPlayButton);
playerPlayButton.addEventListener('click', playButton); 

//application logo
var playerLogoTop = IPHONE5 ? 15+PLAYER_IPHONE5_OFFSET_HEIGHT : 15;
var playerLogo = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/logo.png',
	top:isIpad ? 40 : playerLogoTop
});
viewPlayer.add(playerLogo);

playerNoInternetBar = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/error_bar.png',
	bottom:isIpad ? 55 : 35
});
viewPlayer.add(playerNoInternetBar);

var noInternetLabel = Ti.UI.createLabel({
	text:MSG_NO_INTERNET,
	color:'white',
	width:isIpad ? 600 : 280,
	textAlign:'center',
	font:{fontSize:isIpad ? 24 : 13, fontFamily:'Helvetica'}
});
playerNoInternetBar.add(noInternetLabel);

//info button
var playerInfoButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/button_info_a.png',
	left:0,
	width:isIpad ? 118 : 54,
	height:isIpad ? 110 : 51,
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
		
		//TODO start a timer and if after X seconds the audio player ISNT playing, stop it and start again
	} else if(e.state == 0){
		Ti.API.info('Potential crash in audio player - attempt to recover!');
		audioPlayer.stop();
		destroyAudioPlayer();
		buildAudioPlayer();
		playButton();
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
