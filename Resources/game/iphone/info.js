
var viewInfo = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'info/background_C.jpg',
	bottom:65
});
win.add(viewInfo);

var titleInfoPopup = Ti.UI.createImageView({
	image:IMAGE_PATH+'info/title_info.png',
	top:0
});

viewInfo.add(titleInfoPopup);

var titleInfoLabel = Ti.UI.createLabel({
	text:'Βρείτε μας',
	color:'3bb3e6',
	textAlign:'center',
	width:150,
	top:8,
	font:{fontSize:34, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleInfoPopup.add(titleInfoLabel);

var infoButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'info/button_info_b.png',
	left:0,
	top:0
});
viewInfo.add(infoButton);

var siteButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'info/info1.png',
	top:100
});
viewInfo.add(siteButton);

var infoOffset = 65;

var facebookButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'info/info2.png',
	top:siteButton.top + infoOffset
});
viewInfo.add(facebookButton);

var mailButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'info/info3.png',
	top:facebookButton.top + infoOffset
});
viewInfo.add(mailButton);

var tweeterButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'info/info4.png',
	top:mailButton.top + infoOffset
});
viewInfo.add(tweeterButton);

