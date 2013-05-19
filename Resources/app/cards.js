//height offset for iphone5
var CARDS_IPHONE5_OFFSET_HEIGHT = 50;

//cards view
var viewCards = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'card/background_B.jpg',
	bottom:isIpad ? 146 : 65,
	opacity:0
});

win.add(viewCards);

//title popup
var titleCardPopup = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/title_card.png',
	top:0
});

viewCards.add(titleCardPopup);

//title label in the popup
var titleCardLabel = Ti.UI.createLabel({
	text:CARDS_TITLE,
	color:'3bb3e6',
	textAlign:'center',
	width:isIpad ? 350 : 150,
	left:isIpad ? 75 : 28,  
	top:isIpad ? 10 : 2,
	font:{fontSize:isIpad ? 70 : 29, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleCardPopup.add(titleCardLabel);

//card
var cardImageTop = IPHONE5 ? 73+CARDS_IPHONE5_OFFSET_HEIGHT : 73;
var cardImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/card.png',
	top:isIpad ? 155 : cardImageTop
});

viewCards.add(cardImage);

//coming soon image
var comingSoonImageTop = IPHONE5 ? 53+CARDS_IPHONE5_OFFSET_HEIGHT : 53;
var comingSoonImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/comingsoon.png',
	top:isIpad ? 130 : comingSoonImageTop,
	right:isIpad ? 32 : 5
});

viewCards.add(comingSoonImage);