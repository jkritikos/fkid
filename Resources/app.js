
var isIpad = (Ti.Platform.osname == 'ipad') ? true : false;

var IMAGE_PATH = 'images/iphone/';
var TYPE_PATH = 'game/iphone/';

if(isIpad){
	radio_app_type = 2;
	IMAGE_PATH = 'images/ipad/';
	TYPE_PATH = 'game/ipad/';
}

var win = Titanium.UI.createWindow();

Ti.include(TYPE_PATH+'player.js');

var menuBar = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/menubar.png',
	bottom:0
});
win.add(menuBar);

var streamingButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/tab_radio_select@2x.png',
	zIndex:4,
	bottom:0
});
win.add(streamingButton);
streamingButton.addEventListener('click', playerButtonEvent);	

var scheduleButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/tab_program.png',
	left:20,
	zIndex:4,
	bottom:10
});
win.add(scheduleButton);
scheduleButton.addEventListener('click', scheduleButtonEvent);	

var cardsButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/tab_heart.png',
	right:20,
	zIndex:4,
	bottom:10
});
win.add(cardsButton);
cardsButton.addEventListener('click', cardsButtonEvent);	

win.open();

//Event functions for tabs
function cardsButtonEvent(){
		cardsButton.image = IMAGE_PATH+'player/tab_heart_select.png';
		cardsButton.bottom = 0;
		cardsButton.right = 3;
		defaultPlayerTab();
		defaultScheduleTab();
		Ti.include(TYPE_PATH+'cards.js');
}

function scheduleButtonEvent(){
		scheduleButton.image = IMAGE_PATH+'player/tab_program_select.png';
		scheduleButton.bottom = 0;
		scheduleButton.left = 3;
		defaultPlayerTab();
		defaultCardsTab();
		Ti.include(TYPE_PATH+'schedule.js');
}

function playerButtonEvent(){
		streamingButton.image = IMAGE_PATH+'player/tab_radio_select@2x.png';
		streamingButton.bottom = 0;
		defaultScheduleTab();
		defaultCardsTab();
		Ti.include(TYPE_PATH+'player.js');
}


//default position and image of tabs
function defaultPlayerTab(){
	streamingButton.image = IMAGE_PATH+'player/tab_radio.png';
	streamingButton.bottom = 10;
}

function defaultScheduleTab(){
	scheduleButton.image = IMAGE_PATH+'player/tab_program.png';
	scheduleButton.bottom = 10;
	scheduleButton.left = 20;
}

function defaultCardsTab(){
	cardsButton.image = IMAGE_PATH+'player/tab_heart.png';
	cardsButton.bottom = 10;
	cardsButton.right = 20;
}
