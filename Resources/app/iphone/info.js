//unselect player tab when info view is opened
viewPlayer.zIndex = 0;

//info view
var viewInfo = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'info/background_C.jpg',
	bottom:65,
	opacity:0
});
win.add(viewInfo);

//title popup
var titleInfoPopup = Ti.UI.createImageView({
	image:IMAGE_PATH+'info/title_info.png',
	top:0
});

viewInfo.add(titleInfoPopup);

//title label in popup
var titleInfoLabel = Ti.UI.createLabel({
	text:INFO_TITLE,
	color:'3bb3e6',
	textAlign:'center',
	width:150,
	top:8,
	font:{fontSize:34, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleInfoPopup.add(titleInfoLabel);

//info button change image
var infoButton = Ti.UI.createImageView({
	image:IMAGE_PATH+'info/button_info_b.png',
	left:0,
	top:0
});
viewInfo.add(infoButton);
infoButton.addEventListener('click', handleInfoButton); 

//site button
var siteButton = Ti.UI.createButton({
	image:IMAGE_PATH+'info/info1.png',
	top:110,
	width:320,
	height:58
});
viewInfo.add(siteButton);
siteButton.addEventListener('click', openSiteInSafari);

var infoOffset = 65;

//facebook button
var facebookButton = Ti.UI.createButton({
	image:IMAGE_PATH+'info/info2.png',
	top:siteButton.top + infoOffset,
	width:320,
	height:58
});
viewInfo.add(facebookButton);

//mail button
var mailButton = Ti.UI.createButton({
	image:IMAGE_PATH+'info/info3.png',
	top:facebookButton.top + infoOffset,
	width:320,
	height:58
});
viewInfo.add(mailButton);
mailButton.addEventListener('click', sendMail);

//tweeter button
var tweeterButton = Ti.UI.createButton({
	image:IMAGE_PATH+'info/info4.png',
	top:mailButton.top + infoOffset,
	width:320,
	height:58
});
viewInfo.add(tweeterButton);

//send mail function
function sendMail(){
	var sendEmail = Ti.UI.createEmailDialog();
	sendEmail.toRecipients = ['info@ifeelkid.gr'];
	sendEmail.open();
}

//open the site in the safari
function openSiteInSafari(){
	Titanium.Platform.openURL('http://www.ifeelkid.gr');
}

function handleInfoButton(){
	playerTabSelected.show();
	
	viewPlayer.animate(anim_in);
	viewInfo.animate(anim_out);
}
