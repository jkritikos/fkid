//cards view
var viewCards = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'card/background_B.jpg',
	bottom:65,
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
	width:150,
	top:8,
	font:{fontSize:30, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleCardPopup.add(titleCardLabel);

//card
var cardImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/card.png',
	top:80
});

viewCards.add(cardImage);

//coming soon image
var comingSoonImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/comingsoon.png',
	top:55,
	right:5
});

viewCards.add(comingSoonImage);