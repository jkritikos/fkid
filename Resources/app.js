
var isIpad = (Ti.Platform.osname == 'ipad') ? true : false;

var IMAGE_PATH = 'images/iphone/';
var TYPE_PATH = 'game/iphone/';

//check if it is an ipad
if(isIpad){
	IMAGE_PATH = 'images/ipad/';
	TYPE_PATH = 'game/ipad/';
}

//Fade in animation
var anim_in = Titanium.UI.createAnimation();
anim_in.opacity=1;
anim_in.duration = 250;

//Fade out animation
var anim_out = Titanium.UI.createAnimation();
anim_out.opacity=0;
anim_out.duration = 250;

//create window
var win = Titanium.UI.createWindow({
	fullscreen:true
});

//included all files 
Ti.include('game/dao.js');

Ti.include(TYPE_PATH+'cards.js');
Ti.include(TYPE_PATH+'schedule.js');
Ti.include(TYPE_PATH+'player.js');
Ti.include(TYPE_PATH+'info.js');

viewPlayer.animate(anim_in);

var tableShown = false;

//tab bar
var tabBar = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/menubar.png',
	bottom:0
});
win.add(tabBar);

//player tab
var playerTab = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_radio.png',
	zIndex:4,
	width:isIpad ? 141 : 61,
	height:isIpad ? 103 : 45,
	bottom:isIpad ? 20 : 8
});
win.add(playerTab);
playerTab.addEventListener('click', handlePlayerTab);	

//schedule tab
var scheduleTab = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_program.png',
	left:isIpad ? 54 : 23,
	zIndex:4,
	width:isIpad ? 138 : 59,
	height:isIpad ? 101 : 44,
	bottom:isIpad ? 20 : 8
});
win.add(scheduleTab);
scheduleTab.addEventListener('click', handleScheduleTab);	

//cards tab
var cardsTab = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_heart.png',
	right:isIpad ? 64 : 28,
	width:isIpad ? 120 : 52,
	height:isIpad ? 105 : 46,
	zIndex:4,
	bottom:isIpad ? 20 : 8
});
win.add(cardsTab);
cardsTab.addEventListener('click', handleCardsTab);	

//player tab selected
var playerTabSelected = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_selection.png',
	zIndex:3,
	width:isIpad ? 231 : 100,
	height:isIpad ? 182 : 80,
	bottom:0
});
win.add(playerTabSelected);
playerTabSelected.show();
playerTabSelected.addEventListener('click', handlePlayerTab);	

//schedule tab selected
var scheduleTabSelected = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_selection.png',
	left:isIpad ? 9 : 3,
	zIndex:3,
	width:isIpad ? 231 : 100,
	height:isIpad ? 182 : 80,
	bottom:0
});
win.add(scheduleTabSelected);
scheduleTabSelected.hide();
scheduleTabSelected.addEventListener('click', handleScheduleTab);	

//cards tab selected
var cardsTabSelected = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'player/tab_selection.png',
	right:isIpad ? 9 : 3,
	width:isIpad ? 231 : 100,
	height:isIpad ? 182 : 80,
	zIndex:3,
	bottom:0
});
win.add(cardsTabSelected);
cardsTabSelected.hide();
cardsTabSelected.addEventListener('click', handleCardsTab);

win.open();

//Event functions for tabs
function handleCardsTab(){
		//hide and show accordingly tabs
		cardsTabSelected.show();
		scheduleTabSelected.hide();
		playerTabSelected.hide();
		
		//as long as there is an Internet connection, create another view
		if(Titanium.Network.online == true){
			Ti.include(TYPE_PATH+'cards.js');
		}
		
		//animate in corresponding view and animate out other views 
		viewPlayer.animate(anim_out);
		viewSchedule.animate(anim_out);
		viewCards.animate(anim_in);
		viewInfo.animate(anim_out);
		
		//change the zIndex of viewPlayer who is a constant view
		viewPlayer.zIndex = 0;
		
		//stop bars Loading
		barsLoading(stop);
		//remove no internet error if user opens internet while app is open
		disablePlayerNoInternet();
}

function handleScheduleTab(){
		cardsTabSelected.hide();
		scheduleTabSelected.show();
		playerTabSelected.hide();
		
		if (tableShown){
			viewSchedule.add(scheduleTableView);
			Ti.API.info('inside handler');
		}
		
		getOnlineSchedule();
		
		
		viewPlayer.animate(anim_out);
		viewSchedule.animate(anim_in);
		viewCards.animate(anim_out);
		viewInfo.animate(anim_out);
		
		viewPlayer.zIndex = 0;
		disablePlayerNoInternet();
}

function handlePlayerTab(){
		cardsTabSelected.hide();
		scheduleTabSelected.hide();
		playerTabSelected.show();
		
		viewPlayer.animate(anim_in);
		viewSchedule.animate(anim_out);
		viewCards.animate(anim_out);
		viewInfo.animate(anim_out);
		
		//increase the zIndex to show viewPlayer
		viewPlayer.zIndex = 2;
		barsLoading(stop);
		disablePlayerNoInternet();
}
