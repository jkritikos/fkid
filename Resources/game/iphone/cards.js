var viewCards = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'card/background_B.jpg',
	bottom:65
});

win.add(viewCards);

var titleCardPopup = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/title_card.png',
	top:0
});

viewCards.add(titleCardPopup);

var titleCardLabel = Ti.UI.createLabel({
	text:'Ήξερες ότι..',
	color:'3bb3e6',
	textAlign:'center',
	width:150,
	top:8,
	font:{fontSize:30, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleCardPopup.add(titleCardLabel);

var cardImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/card.png',
	top:70
});

viewCards.add(cardImage);

var comingSoonImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'card/comingsoon.png',
	top:55,
	right:5
});

viewCards.add(comingSoonImage);