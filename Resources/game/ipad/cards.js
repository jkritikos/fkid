//cards view
var viewCards = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'card/background_B.jpg',
	bottom:146
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
	text:'Ήξερες ότι..',
	color:'3bb3e6',
	textAlign:'center',
	width:350,
	top:22,
	font:{fontSize:70, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleCardPopup.add(titleCardLabel);

//card
var cardImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/card.png',
	top:185
});

viewCards.add(cardImage);

//coming soon image
var comingSoonImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/comingsoon.png',
	top:140,
	right:67
});

viewCards.add(comingSoonImage);