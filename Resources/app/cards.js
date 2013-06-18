//height offset for iphone5
var CARDS_IPHONE5_OFFSET_HEIGHT = 50;
var cardImageTop = IPHONE5 ? 73+CARDS_IPHONE5_OFFSET_HEIGHT : 73;

var cardSelectionListContainer = null;

/*Returns an array with the image views for all the cards available to the app.
 Checks if any purchases have been made and performs accordingly*/
function createCardViews(){
	var cardViews = [];
	var tmpCard = null;
	var tmpCardContainer = null;
	var tmpCardIndexLabel = null;
	var homeButton = null;
	
	//create arrow images
	var cardArrowRight = Ti.UI.createImageView({
		image:IMAGE_PATH+'card/arrow-right.png',
		right:2,
		zIndex:10
	});
	
	//If there are no purchases, just add the demo cards
	if(!purchasedPack){
		for(var i=1; i <= 10; i++){
			
			tmpCard = Ti.UI.createImageView({
				image:IMAGE_PATH+'card/demo/demo'+i+'.png',
				top:isIpad ? 155 : cardImageTop
			});
			
			cardViews.push(tmpCard);
		}
	} else {
		
		//create cards
		for(var i=1; i <= 110; i++){
			tmpCard = Ti.UI.createImageView({
				image:IMAGE_PATH+'card/pack1_gr/'+i+'.png',
				top:isIpad ? 155 : cardImageTop
			});
			
			cardViews.push(tmpCard);
		}
	}
	
	return cardViews;
}

/*Creates the card selection (1-10, 11-20 etc) - available only after purchases are made*/
function createCardSelectionList(){
	var CARD_SELECTION_OFFSET_X = 79;
	var CARD_SELECTION_OFFSET_Y = 105;
	var LIST_TOP = 70;
	
	cardSelectionListContainer = Ti.UI.createView({
		top:LIST_TOP
	});
	
	var cardListButton1 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/demo.png',
		width:78,
		height:100,
		left:3,
		top:5,
		cardIndex:1
	});
	
	var cardListButton2 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/1-10.png',
		width:78,
		height:100,
		left:cardListButton1.left+CARD_SELECTION_OFFSET_X,
		top:5,
		cardIndex:11
	});
	
	var cardListButton3 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/11-20.png',
		width:78,
		height:100,
		left:cardListButton2.left+CARD_SELECTION_OFFSET_X,
		top:5,
		cardIndex:21
	});
	
	var cardListButton4 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/21-30.png',
		width:78,
		height:100,
		left:cardListButton3.left+CARD_SELECTION_OFFSET_X,
		top:5,
		cardIndex:31
	});
	
	//row2
	var cardListButton5 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/31-40.png',
		width:78,
		height:100,
		left:3,
		top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
		cardIndex:41
	});
	
	var cardListButton6 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/41-50.png',
		width:78,
		height:100,
		left:cardListButton1.left+CARD_SELECTION_OFFSET_X,
		top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
		cardIndex:51
	});
	
	var cardListButton7 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/51-60.png',
		width:78,
		height:100,
		left:cardListButton2.left+CARD_SELECTION_OFFSET_X,
		top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
		cardIndex:61
	});
	
	var cardListButton8 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/61-70.png',
		width:78,
		height:100,
		left:cardListButton3.left+CARD_SELECTION_OFFSET_X,
		top:cardListButton1.top+CARD_SELECTION_OFFSET_Y,
		cardIndex:71
	});
	
	//row3
	var cardListButton9 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/71-80.png',
		width:78,
		height:100,
		left:3,
		top:cardListButton5.top+CARD_SELECTION_OFFSET_Y,
		cardIndex:81
	});
	
	var cardListButton10 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/81-90.png',
		width:78,
		height:100,
		left:cardListButton1.left+CARD_SELECTION_OFFSET_X,
		top:cardListButton5.top+CARD_SELECTION_OFFSET_Y,
		cardIndex:91
	});
	
	var cardListButton11 = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'card/selection/91-100.png',
		width:78,
		height:100,
		left:cardListButton2.left+CARD_SELECTION_OFFSET_X,
		top:cardListButton5.top+CARD_SELECTION_OFFSET_Y,
		cardIndex:101
	});
	
	var cardListButton12 = Ti.UI.createImageView({
		image:IMAGE_PATH+'card/selection/more-soon.png',
		width:78,
		height:100,
		left:cardListButton3.left+CARD_SELECTION_OFFSET_X,
		top:cardListButton5.top+CARD_SELECTION_OFFSET_Y
	});
	
	cardSelectionListContainer.add(cardListButton1);
	cardSelectionListContainer.add(cardListButton2);
	cardSelectionListContainer.add(cardListButton3);
	cardSelectionListContainer.add(cardListButton4);
	cardSelectionListContainer.add(cardListButton5);
	cardSelectionListContainer.add(cardListButton6);
	cardSelectionListContainer.add(cardListButton7);
	cardSelectionListContainer.add(cardListButton8);
	cardSelectionListContainer.add(cardListButton9);
	cardSelectionListContainer.add(cardListButton10);
	cardSelectionListContainer.add(cardListButton11);
	cardSelectionListContainer.add(cardListButton12);
	
	cardListButton1.addEventListener('click', handleCardSelection);
	cardListButton2.addEventListener('click', handleCardSelection);
	cardListButton3.addEventListener('click', handleCardSelection);
	cardListButton4.addEventListener('click', handleCardSelection);
	cardListButton5.addEventListener('click', handleCardSelection);
	cardListButton6.addEventListener('click', handleCardSelection);
	cardListButton7.addEventListener('click', handleCardSelection);
	cardListButton8.addEventListener('click', handleCardSelection);
	cardListButton9.addEventListener('click', handleCardSelection);
	cardListButton10.addEventListener('click', handleCardSelection);
	cardListButton11.addEventListener('click', handleCardSelection);
	cardListButton12.addEventListener('click', handleCardSelection);
	
	viewCards.add(cardSelectionListContainer);
}

//Event handler for the cards scroll event
function handleCardScroll(e){
	//Ti.API.info('SCROLL EVENT');
	
	var cardIndex = (e.currentPage+1);
	
	if(cardIndex <= 10){
		cardIndexLabel.hide();
	} else {
		cardIndexLabel.show();
	}
	
	//subtract the demo cards to align the numbering
	cardIndex -= 10;
	cardIndexLabel.text = cardIndex;
}

//Event handler for selecting a card from the listing
function handleCardSelection(e){
	var scrollToIndex = e.source.cardIndex;
	if(scrollToIndex != null){
		
		scrollToIndex = scrollToIndex - 1;
		cardSrollableView.setCurrentPage(scrollToIndex);
		
		//Show/hide the card indicator
		if(scrollToIndex < 10){
			cardIndexLabel.hide();
		} else {
			//subtract the demo cards to align the numbering
			var cardIndex = (scrollToIndex+1) -10;
			cardIndexLabel.text = cardIndex;
			cardIndexLabel.show();
		}
	
		//show the home button
		cardHomeButton.show();
		
		//show the cards
		cardSelectionListContainer.opacity = 0;
		cardSrollableView.opacity = 1;
	}
}

//Event handler for the card home button
function handleCardHomeButton(){
	cardHomeButton.hide();
	cardIndexLabel.hide();
	
	cardSelectionListContainer.opacity = 1;
	cardSrollableView.opacity = 0;
}

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

//Cards scrollable view
var cardSrollableView = Ti.UI.createScrollableView({
	showPagingControl:false,
	opacity:0
});

//Card index label
var cardIndexLabel = Ti.UI.createLabel({
	color:'77d040',
	text:'1',
	font:{fontSize:isIpad ? 68 : 27, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'},
	zIndex:20,
	right:8,
	top:5,
	visible:false
});

//Card home button
var cardHomeButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'card/home.png',
	width:58,
	height:54,
	visible:false,
	top:0,
	left:0,
	zIndex:20,
})


//Build cards and scrollable view
var cardViews = createCardViews();
cardSrollableView.setViews(cardViews);

//Add the scrollable list
viewCards.add(cardSrollableView);

viewCards.add(cardIndexLabel);
viewCards.add(cardHomeButton);

//Add event listeners
cardSrollableView.addEventListener('scrollend', handleCardScroll);
cardHomeButton.addEventListener('click', handleCardHomeButton);

//Show tha card selection list, if any purchases have been made
if(purchasedPack){
	createCardSelectionList();
} else {
	
}

