//url
var url = 'http://www.ifeelkid.gr/program/';

//schedule view
var viewSchedule = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'program/background_B.jpg',
	bottom:146
});

win.add(viewSchedule);

//title popup
var titleSchedulePopup = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/title.png',
	top:0
});

viewSchedule.add(titleSchedulePopup);

//day label
var titleScheduleLabel = Ti.UI.createLabel({
	text:'loading...',
	color:'3bb3e6',
	textAlign:'center',
	width:350,
	top:16,
	font:{fontSize:67, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleSchedulePopup.add(titleScheduleLabel);

//if there is no network - show network error message 
if(!Titanium.Network.online){
	
	titleScheduleLabel.text = 'OOPS!'
	
	var scheduleNoInternetBar = Ti.UI.createImageView({
		image:IMAGE_PATH+'player/error_bar.png',
		bottom:347
	});
	viewSchedule.add(scheduleNoInternetBar);
	
	var scheduleNoInternetLabel = Ti.UI.createLabel({
		text:'Φαίνεται να μην είσαι συνδεδεμένος στο Internet.. Συνδέσου και δοκίμασε ξανά!',
		color:'white',
		width:600,
		textAlign:'center',
		font:{fontSize:24, fontFamily:'Helvetica'}
	});
	scheduleNoInternetBar.add(scheduleNoInternetLabel);
}

var loadingBar1 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar1.png',
	left:180,
	top:465
});

viewSchedule.add(loadingBar1);

var loadingBar2 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar2.png',
	top:465
});

viewSchedule.add(loadingBar2);

var loadingBar3 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar1.png',
	right:180,
	top:465
});

viewSchedule.add(loadingBar3);


//schedule table view
var scheduleTableView = Ti.UI.createTableView({
	backgroundColor:'transparent',
	bottom:0,
	top:207,
	separatorColor:'transparent',
	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
});

setTimeout(function(){
	loadingBar1.hide();
	loadingBar2.hide();
	loadingBar3.hide();
	viewSchedule.add(scheduleTableView);
}, 600);

getOnlineSchedule();

