
var isIpad = (Ti.Platform.osname == 'ipad') ? true : false;

var IMAGE_PATH = 'images/iphone/';
var TYPE_PATH = 'game/iphone/';

//check if it is an ipad
if(isIpad){
	IMAGE_PATH = 'images/ipad/';
	TYPE_PATH = 'game/ipad/';
}

//create window
var win = Titanium.UI.createWindow({
	fullscreen:true
});

//include player.js as a startup view
Ti.include(TYPE_PATH+'player.js');

//tab bar
var tabBar = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/menubar.png',
	bottom:0
});
win.add(tabBar);

//player tab
var playerTab = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_radio_select.png',
	zIndex:4,
	width:isIpad ? 231 : 100,
	height:isIpad ? 182 : 80,
	bottom:0
});
win.add(playerTab);
playerTab.addEventListener('click', handlePlayerTab);	

//schedule tab
var scheduleTab = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_program.png',
	left:isIpad ? 40 : 20,
	zIndex:4,
	width:isIpad ? 138 : 59,
	height:isIpad ? 101 : 44,
	bottom:isIpad ? 20 : 10
});
win.add(scheduleTab);
scheduleTab.addEventListener('click', handleScheduleTab);	

//cards tab
var cardsTab = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_heart.png',
	right:isIpad ? 40 : 20,
	width:isIpad ? 120 : 52,
	height:isIpad ? 105 : 46,
	zIndex:4,
	bottom:isIpad ? 20 : 10
});
win.add(cardsTab);
cardsTab.addEventListener('click', handleCardsTab);	

win.open();

//Event functions for tabs
function handleCardsTab(){
		//change image, position, and dimensions to selected image
		cardsTab.backgroundImage = IMAGE_PATH+'player/tab_heart_select.png';
		cardsTab.bottom = 0;
		cardsTab.right = isIpad ? 23 : 3;
		cardsTab.width = isIpad ? 231 : 100;
		cardsTab.height = isIpad ? 182 : 80;
		//change image, position, and dimensions to unselected image
		unselectPlayerTab();
		unselectScheduleTab();
		Ti.include(TYPE_PATH+'cards.js');
}

function handleScheduleTab(){
		scheduleTab.backgroundImage = IMAGE_PATH+'player/tab_program_select.png';
		scheduleTab.bottom = 0;
		scheduleTab.left = isIpad ? 23 : 3;
		scheduleTab.width = isIpad ? 231 : 100;
		scheduleTab.height = isIpad ? 182 : 80;
		unselectPlayerTab();
		unselectCardsTab();
		Ti.include(TYPE_PATH+'schedule.js');
}

function handlePlayerTab(){
		playerTab.backgroundImage = IMAGE_PATH+'player/tab_radio_select.png';
		playerTab.bottom = 0;
		playerTab.width = isIpad ? 231 : 100;
		playerTab.height = isIpad ? 182 : 80;
		unselectScheduleTab();
		unselectCardsTab();
		Ti.include(TYPE_PATH+'player.js');
}


//unselect tab
function unselectPlayerTab(){
	//change image, position, and dimensions to unselected image
	playerTab.backgroundImage = IMAGE_PATH+'player/tab_radio.png';
	playerTab.bottom = isIpad ? 20 : 10;
	playerTab.width = isIpad ? 141 : 61;
	playerTab.height = isIpad ? 103 : 45;
}

function unselectScheduleTab(){
	scheduleTab.backgroundImage = IMAGE_PATH+'player/tab_program.png';
	scheduleTab.bottom = isIpad ? 20 : 10;
	scheduleTab.left = isIpad ? 40 : 20;
	scheduleTab.width = isIpad ? 138 : 59;
	scheduleTab.height = isIpad ? 101 : 44;
}

function unselectCardsTab(){
	cardsTab.backgroundImage = IMAGE_PATH+'player/tab_heart.png';
	cardsTab.bottom = isIpad ? 20 : 10;
	cardsTab.right = isIpad ? 40 : 20;
	cardsTab.width = isIpad ? 120 : 52;
	cardsTab.height = isIpad ? 105 : 46;
}
