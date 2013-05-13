//url
var url = 'http://www.ifeelkid.gr/program/';

//schedule view
var viewSchedule = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'program/background_B.jpg',
	bottom:65,
	opacity:0
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
	width:150,
	top:8,
	font:{fontSize:34, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleSchedulePopup.add(titleScheduleLabel);

//orange bar 1
var loadingBar1 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar1.png',
	left:70,
	top:220,
	blueBar:false
});

viewSchedule.add(loadingBar1);

//orange bar 2
var loadingBar2 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar1.png',
	top:220,
	blueBar:false
});

viewSchedule.add(loadingBar2);

//orange bar 3
var loadingBar3 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar1.png',
	right:70,
	top:220,
	blueBar:false
});

viewSchedule.add(loadingBar3);

//blue bar 1
var blueBar1 = Ti.UI.createImageView({
	//image:IMAGE_PATH+'program/loading_bar2.png',
	//left:70,
	top:220,
	zIndex:1
});

viewSchedule.add(blueBar1);

//blue bar 1
/*var blueBar2 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar2.png',
	top:220,
	zIndex:1
});

viewSchedule.add(blueBar2);
blueBar2.hide();

//blue bar 1
var blueBar3 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar2.png',
	right:70,
	top:220,
	zIndex:1
});

viewSchedule.add(blueBar3);
blueBar3.hide();*/

//schedule table view
var scheduleTableView = Ti.UI.createTableView({
	backgroundColor:'transparent',
	bottom:0,
	top:110,
	separatorColor:'transparent',
	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
});
//start Loading of bars 
barsLoading(start);
//barsLoading(start);
//get data and show table
//getOnlineSchedule();